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

mongoose.connect('mongodb://localhost:27017/swastik', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("db connected in register route");
});

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
    res.send("Go to home page nothing here!!");
})

router.post("/parent",isLoggedIn, (req, res) => {
    console.log(req.body);
    parent = new Parent(req.body);
    parent.save((err, parent) => {
        if (err)
            console.log("Error a gaya !!" + err);
        else if (parent._id) {
            console.log("Data Successfully Added " + parent.name + " , " + parent.spouse + " , " + parent.children)
            Parent.findOne({ '_id': parent._id }, (err, parent) => {
                if (err)
                    console.log(err)
                else {
                    console.log("Returned Parent JSON ");
                    res.send(parent);
                }
            })
        }
    });
})

router.post("/child",isLoggedIn, (req, res) => {
    child = new Child(req.body);
    child.save((err, child) => {
        if (err)
            console.log("Error a gaya !!" + err);
        else if (child._id) {
            console.log("Data Successfully Added " + child.name + " , " + child.Mphoneno + " , " + child.Fphoneno)
            Child.findOne({'_id':child._id}, (err, ward)=>{
                if(err)
                console.log(err)
                else{
                    console.log("Returned Parent JSON ");
                    res.send(ward);
                }
            })
        }
    });
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Access Denied!!")
    res.redirect("/login");
}

module.exports = router;