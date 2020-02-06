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
    Complain = require("../models/complain");

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

router.post("/log_complaint",(req,res)=>{
    console.log("Here!!");
    var complainer = req.body.complainer;
    var complaint = req.body.complaint;
    Parent.findOne({'email':complainer},(err,parent)=>{
        complainer = parent._id;
        setTimeout(()=>{
            var new_complain = new Complain({'complainer':complainer,'complaint':complaint});

            new_complain.save((err,complain)=>{
                if(err){
                    console.log(error);
                }
                else{
                    console.log("Complaint registered!!");
                    res.send(complain); 
                }
            });
        },200);
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