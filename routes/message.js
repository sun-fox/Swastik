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

// mongoose.connect(process.env.LOCALDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("db connected in protect route");
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

router.get("/", (req, res) => {
    res.send("Here is nothing for you go to index page")
})

router.get("/phonenos", (req, res) => {
    var phonenos = [];
    var today = req.query.date;
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
        res.render("printnos", { contactnos: phonenos });
    }, 1000);
});

router.get("/whatsapp", (req, res) => {
    var phonenos = [];
    var today = req.query.date;
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
        res.render("whatsappnos", { contactnos: phonenos });
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
    }, 1000);
});

const nexmo = new Nexmo({
    apiKey: '0d4daa02',
    apiSecret: 'SAHw2cuS28PlWHNQ'
}, { debug: true });


router.post('/sendtoall', (req, res) => {
    console.log("Reached");
    var arr = req.body.contactnos.split(',');
    var msg = req.body.msg;
    for (var number in arr) {
        arr[number] = "91" + arr[number];
        console.log(arr[number]);
        nexmo.message.sendSms(
            '918957790795', arr[number], msg, { type: 'unicode' },
            (err, responseData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.dir(responseData);
                }
            });
    }
    res.render('effect.ejs',{contactnos:arr});

});


router.post('/sendwhatsapptoall', (req, res) => {
    const linkimg = req.body.link;
    const message = req.body.message;
    client.messages.create({
        to: "whatsapp:+918957790795",
        from: "whatsapp:+14155238886",
        body: message,
        mediaUrl: linkimg
    }).then(message => {
        console.log(message.sid);
    }).catch(err => console.log(err));
    res.render('confirm');
});

router.post('/sendmailtoall', (req, res) => {
    var arr = req.body.contactnos.split(',');
    var msg = req.body.msg;
    res.send("Work under progress!!");

});

router.get("/email", (req, res) => {
    var email = [];
    var today = req.query.date;
    console.log(today);
    Child.find({ "vaccinations.duedate": today }, (err, ward) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(ward);
            ward.forEach(child => {
                if (child.Mphoneno) {
                    console.log("M" + child.Mphoneno);
                    setTimeout(()=>{
                        Parent.findOne({ "phoneno": child.Mphoneno }, (err, parent) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("M" + parent);
                                if (email.indexOf(parent.email) === -1)
                                    email.push(parent.email);
                            }
                        });
                    },200);
                }
                if (child.Fphoneno) {
                    console.log("F" + child.Fphoneno);
                    setTimeout(()=>{
                        Parent.findOne({ "phoneno": child.Fphoneno }, (err, parent) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("F" + parent);
                                if (email.indexOf(parent.email) === -1)
                                    email.push(parent.email);
                            }
                        });
                    },200)
                }
                console.log(email)
            });
        }
    });
    setTimeout(() => {
        res.render("emailnos",{contactnos : email});
    }, 800);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;