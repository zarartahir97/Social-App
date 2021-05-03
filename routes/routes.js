const express = require('express');
const session = require('sessionstorage');
const router = express.Router();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.secretKey);
const user = require('../models/users');
const checkAuth = require('../middleware/check-auth');

router.get('/login', (req, res) => {
    user.findAll({
        where: {
            [Op.and]: [
              { email: req.body.email },
              { password: req.body.password }
            ]
          }
    })
    .then(result => {
        if (result.length < 1) {
            return res.status(401).json({
                message: "Authentication Failed"
            })
        }
        else
        {
            const token = jwt.sign(
                {
                    userID: result[0].id,
                    email: result[0].email,
                    password: result[0].password
                },
                process.env.jwtKey,
                { expiresIn: '1h'});

            res.status(200).json({
                message : "Login Successful",
                token : token
            });
            session.setItem('token', token);
            session.setItem('name', result[0].name);
            session.setItem('type', result[0].type);
            session.setItem('access', result[0].access);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/feed', checkAuth, (req, res) => {
    if (session.getItem('type') == 'paid') {
        res.render('feed');
    }
    else {
        res.send("You are a free user. Pay subscription fee to view social feed.")
    }
});

router.get('/checkout', checkAuth, (req, res) => {
    res.render('checkout', { publicKey: process.env.publicKey, userEmail: req.userData.email });
});

router.post('/payment', checkAuth, function(req, res){

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: session.getItem('name')
    })
    .then((customer) => {
        return stripe.charges.create({
            amount: 2500,
            description: 'Social Feed Subscription',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then(result => {
        console.log(result);
        user.update({ type: 'paid' }, {
            where: {
                id: req.userData.userID
            }
          });
    })
    .then(() => {
        res.status(200).json({
            message: "Subscription Fees Paid Successfully"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;