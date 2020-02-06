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

router.get("/count_parents_children", (req, res) => {
    var male_parents = [];
    var female_parents = [];
    var male_childs = [];
    var female_childs = [];
    Parent.find({},(err,parent)=>{
        if(err){
            console.log("error");
        }
        else{
            setTimeout(()=>{
                parent.forEach((parent)=>{
                    if(parent.gender == 'M'){
                        male_parents.push(parent);
                    }
                    else if(parent.gender == 'F'){
                        female_parents.push(parent);
                    }
                })
            },100); 
        }
    });
    Child.find({},(err,child)=>{
        if(err){
            console.log("error");
        }
        else{
            setTimeout(()=>{
                child.forEach((child)=>{
                    if(child.gender == 'M'){
                        male_childs.push(child);
                    }
                    else if(child.gender == 'F'){
                        female_childs.push(child);
                    }
                })
            },100); 
        }
    });

    setTimeout(()=>{
        var count_JSON = {
            'Male Parents Count':male_parents.length,
            'Female Parents Count':female_parents.length,
            'Male Children Count':male_childs.length,
            'Female Children Count':female_childs.length,
        }
        res.send(count_JSON);
    },500)
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Access Denied!!")
    res.redirect("/login");
}

module.exports = router;