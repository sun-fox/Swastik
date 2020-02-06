var express = require('express');
var router = express.Router(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("../models/user"),
    Child = require("../models/child"),
    Parent = require("../models/parent");

// mongoose.connect(process.env.LOCALDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("db connected in register route");
// });

router.use(require("express-session")({
    secret: "secret!",
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", isLoggedIn, (req, res) => {
    res.send("check the url, lil bit displayed!!");
});

router.get("/children/pincode/:pincode", (req, res) => {
    var arr = [];
    var pincode = req.params.pincode;
    Child.find({}, (err, ward) => {
        if (err) {
            console.log(err);
        }
        else {
            setTimeout(() => {
                ward.forEach((child)=>{
                    var address = child.address;
                    address.forEach((data)=>{
                        if(data.pincode == pincode){
                            arr.push(child);
                        }
                    })
                });
                console.log(arr);
                res.send(arr);
            }, 1000);
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Access Denied!!")
    res.redirect("/login");
}

module.exports = router;