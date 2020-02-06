var express = require('express');
var router = express.Router(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("../models/user");

<<<<<<< HEAD
mongoose.connect('mongodb://localhost:27017/swastik', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("db connected in login route");
});
=======
// mongoose.connect(process.env.LOCALDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("db connected in login route");
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
router.use(bodyParser.urlencoded({extended: true}));
>>>>>>> upstream/master

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
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', async function (req, res) {
    try {
        res.render('login');
    } catch (err) {
        res.send(err);
    }
})

router.post("/user",passport.authenticate("local",{
    successRedirect:"../",
    failureRedirect:"../Login",
    failureMessage:"failed"
}),(req,res)=>{})

module.exports = router;
