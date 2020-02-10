var express = require('express');
var router = express.Router(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("../models/user"),
    Child = require("../models/child"),
    Parent = require("../models/parent"),
    Complain = require("../models/complain"),
    Case = require('../models/case');

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
    res.send("Report are registered here!!");
});

router.get("/patientDetails", (req, res) => {
    Case.find({}, (err, cases) => {
        if (err) {
            console.log(err);
        } else {
            // res.send(cases);
            // console.log(cases);
            res.render('patientDetails', { cases: cases });
        }
    })
});
router.get("/patientDetails/api", (req, res) => {
    Case.find({}, (err, cases) => {
        if (err) {
            console.log(err);
        } else {
            // res.send(cases);
            // console.log(cases);

            res.send(Object.entries(cases));
        }
    })
});

router.post("/register", (req, res) => {
    var rep = req.body;
    report = new Case(rep);
    console.log(report);
    report.save((err, report) => {
        if (err) {
            console.log(err);
        } else {
            // res.send(report);
            res.redirect("/casereg");

        }
    });
});

router.get("/predict", (req, res) => {
    var rep = req.body;
    // report = new Case(rep);
    console.log(rep);
    // report.save((err, report) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else{
    //         res.send(report);
    //     }
    // });
    res.render("predict");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Access Denied!!")
    res.redirect("/login");
}

module.exports = router;