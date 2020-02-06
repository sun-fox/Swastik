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

const Nexmo = require('nexmo');

<<<<<<< HEAD
mongoose.connect('mongodb://localhost:27017/swastik', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("db connected in protect route");
});
=======
// mongoose.connect(process.env.LOCALDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("db connected in protect route");
// });
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
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    res.send("Here is nothing for you go to index page")
})

router.get("/phonenos", (req, res) => {
    var phonenos = [];
<<<<<<< HEAD
    var today = req.body.date;
=======
    var today = req.query.date;
>>>>>>> upstream/master
    console.log(today);
    Child.find({ "vaccinations.duedate": today }, (err, ward) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(ward);
            ward.forEach((child) => {
                if (child.Mphoneno) {
                    if (phonenos.indexOf(child.Mphoneno) === -1)
<<<<<<< HEAD
                    phonenos.push(child.Mphoneno);
=======
                        phonenos.push(child.Mphoneno);
>>>>>>> upstream/master
                    console.log(child.Mphoneno);
                }
                if (child.Fphoneno) {
                    console.log(child.Fphoneno);
                    if (phonenos.indexOf(child.Fphoneno) === -1)
<<<<<<< HEAD
                    phonenos.push(child.Fphoneno);
=======
                        phonenos.push(child.Fphoneno);
>>>>>>> upstream/master
                }
                console.log(phonenos)
            })
        }
    });
    setTimeout(() => {
<<<<<<< HEAD
        res.render("phonenos",{contactnos:phonenos});
=======
        res.render("phonenos", { contactnos: phonenos });
    }, 1000);
});

router.get("/phonenos/all_parents/:pincode", (req, res) => {
    var phonenos = [];
    var today = req.query.date;
    console.log(today);
    Child.find({ "address.pincode": req.params.pincode }, (err, ward) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(ward);
            ward.forEach((child) => {
                if (child.Mphoneno) {
                    if (phonenos.indexOf(child.Mphoneno) === -1)
                        phonenos.push(child.Mphoneno);
                    console.log(child.Mphoneno);
                }
                if (child.Fphoneno) {
                    console.log(child.Fphoneno);
                    if (phonenos.indexOf(child.Fphoneno) === -1)
                        phonenos.push(child.Fphoneno);
                }
                console.log(phonenos)
            })
        }   
    });
    setTimeout(() => {
        res.render("phonenos", { contactnos: phonenos });
>>>>>>> upstream/master
    }, 1000);
});

const nexmo = new Nexmo({
    apiKey: '0d4daa02',
    apiSecret: 'SAHw2cuS28PlWHNQ'
}, { debug: true });


router.post('/sendtoall', (req, res) => {
<<<<<<< HEAD
    var arr = req.body.nos;
    console.log(arr);
    const text = "helllo i am atul from nodejs";
=======
    var arr = req.body.contactnos.split(',');
    var msg = req.body.msg;
>>>>>>> upstream/master
    for (var number in arr) {
        arr[number] = "91" + arr[number];
        console.log(arr[number]);
        nexmo.message.sendSms(
<<<<<<< HEAD
            '918957790795', arr[number], text, { type: 'unicode' },
=======
            '918957790795', arr[number], msg, { type: 'unicode' },
>>>>>>> upstream/master
            (err, responseData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.dir(responseData);
                }
<<<<<<< HEAD
            }
        );

=======
            });
>>>>>>> upstream/master
    }
    res.send("Messages Sent!!");

});

router.get("/email", (req, res) => {
    var email = [];
    var today = req.body.date;
    console.log(today);
    Child.find({ "vaccinations.duedate": today }, (err, ward) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(ward);
            ward.forEach(async (child) => {
                if (child.Mphoneno) {
                    console.log("M" + child.Mphoneno);
                    await Parent.findOne({ "phoneno": child.Mphoneno }, (err, parent) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("M" + parent);
                            if (email.indexOf(parent.email) === -1)
                                email.push(parent.email);
                        }
                    })
                }
                if (child.Fphoneno) {
                    console.log("F" + child.Fphoneno);
                    await Parent.findOne({ "phoneno": child.Fphoneno }, (err, parent) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("F" + parent);
                            if (email.indexOf(parent.email) === -1)
                                email.push(parent.email);
                        }
                    })
                }
                console.log(email)
            })
        }
    });
    setTimeout(() => {
        res.send(email);
    }, 100);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;