const express = require('express');
const session = require('sessionstorage');
const router = express.Router();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
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
        res.render('feed');
});

module.exports = router;