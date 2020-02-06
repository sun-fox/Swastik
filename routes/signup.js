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
    console.log("db connected in signup route");
});
=======
// mongoose.connect(process.env.LOCALDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("db connected in signup route");
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
// router.set('view engine','ejs');
router.use(bodyParser.urlencoded({ extended: true }));
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
// router.set('view engine','ejs');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async function (req, res) {
    try {
        res.render('signup');
    } catch (err) {
        res.send(err);
    }
});

router.post('/new_user', (req, res) => {
    try {
        console.log("hello " + req.body);
        User.register(new User({ username: req.body.username, email: req.body.email, phoneno: req.body.phoneno, aadharno: req.body.aadharno }), req.body.password, function (err, user) {
            if (err) {
                console.log("error in user registering!")
                console.log(err);
                return res.render("signup");
            }
            passport.authenticate("local")(req, res, () => {
                console.log("User Authenticated")
                res.redirect("/");
            })
        })
    }
    catch (err) {
        res.send(err);
    }
});


module.exports = router;
