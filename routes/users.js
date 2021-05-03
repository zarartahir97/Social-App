const express = require('express');
const router = express.Router();
const user = require('../models/users');

router.post('/', (req, res) => {
    user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,  
    })
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "User Added Successfully"
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