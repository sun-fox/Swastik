var express = require('express');
var router = express.Router();
var jwt = require("../app");
var User = require('../model/user');
// var Cookie = require("../node_modules/cookie")

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/innoreva', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("db connected in login route");
});

router.get('/', async function (req, res) {
    try {
        // res.render('login.ejs');
        res.send("Comming Soon!!")
    } catch (err) {
        res.send(err);
    }
})

router.post('/user', (req, res) => {
    try {
        var client = req.body;
        console.log(client.email + " , " + client.password)
        if (req.body.email == "" || req.body.password == "" || !req.body.password) {
            res.send("Please Enter Valid Credentials");
        }
        else {
            User.findOne({ 'email': client.email }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.send("No account available for that email, kindly signUp.")
                }
                else {
                    console.log("User Found!!");
                    jwt.sign(client, "Innoreva@SecretKy3786", { expiresIn: '1h' }, (err, token) => {
                        if (client.password == user.password) {
                            console.log(token);
                            // cookie = new Cookie("usr_token", token); //name and value of the cookie
                            // cookie.setMaxAge('1h'); //expire could be 60 (seconds)
                            // cookie.setHttpOnly(true);
                            // cookie.setPath("/");
                            res.addCookie(cookie);
                            res.send(token);
                            console.log("User Logged In Succesfully!!");
                        }
                        else {
                            console.log("JWT signing failed");
                        }
                    })
                }
            });
        }
    }
    catch (err) {
        res.send(err);
    }
});


module.exports = router;
