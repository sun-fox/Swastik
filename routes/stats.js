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



router.get("/patients_count_wrt_disease", (req, res) => {
    var map = {};
    Child.find({}, (err, ward) => {
        if (err) {
            console.log(err);
        } else {
            setTimeout(() => {
                ward.forEach((child) => {
                    var vaccinations = child.vaccinations;
                    vaccinations.forEach((data) => {
                        if (!map[data.disease]) {
                            map[data.disease] = 0;
                        }
                        map[data.disease]++;
                    })
                });
                console.log(map);
                res.send(map);
            }, 1000);
        }
    });
});


router.get("/children/pincode", (req, res) => {
    var map = {};
    Child.find({}, (err, ward) => {
        if (err) {
            console.log(err);
        } else {
            setTimeout(() => {
                ward.forEach((child) => {
                    var address = child.address;
                    address.forEach((data) => {
                        if (!map[data.pincode]) {
                            map[data.pincode] = 0;
                        }
                        map[data.pincode]++;
                    })
                });
                // var entries = Object.entries(map);
                // console.log(entries);
                // map['kbskj'] = 1;
                // map['shxjskjjkj'] = 2;
                res.send(map);
            }, 1000);
        }
    });
});
router.get('/viewstats', function(req, res) {
    res.render('stats');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Access Denied!!")
    res.redirect("/login");
}

module.exports = router;