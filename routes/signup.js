var express = require('express');
var router = express.Router();
var User = require('../model/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/innoreva', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("db connected in signup route");
});

router.get('/', async function (req, res) {
    try {
        // res.render('signup.ejs');
        res.send("Comming Soon!!")
    } catch (err) {
        res.send(err);
    }
});

router.post('/new_user', (req, res) => {
    try {
        var client = req.body;
        new_user = new User(client);
        // new_user = client;
        console.log("recieved on server: "+ new_user);
        new_user.save((err, user) => {
            if (err)
                console.log("Error a gaya !!");
            else if (user._id) {
                console.log("Data Successfully Added !!");
                res.send(user)
            }
        });
    }
    catch (err) {
        res.send(err);
    }
});


module.exports = router;
