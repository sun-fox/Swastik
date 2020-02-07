var express = require('express');
var methodOverride = require("method-override");
var router = express.Router(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("../models/user"),
    Parent = require("../models/parent"),
    async = require("async"),
    Child = require("../models/child");

// mongoose.connect(process.env.LOCALDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("db connected in client route");
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
router.use(methodOverride("_method"));
router.post("/parent", (req, res) => {
    var aadhar = req.body.aadharno;
    console.log("Aadhar no. " + aadhar);

    Parent.findOne({ 'aadharno': aadhar }, (err, parent) => {
        if (err)
            console.log(err);
        else {
            if (parent != null) {
                console.log("Crash Point!!");
                console.log("Returned Json" + parent)
                res.render("parent.ejs", { Parent: parent });
            }
        }
    })
})

router.post("/parent/qrlogin", (req, res) => {
    var aadhar = req.body.aadharno.substring(4,16);
    console.log("Aadhar no. " + aadhar);

    Parent.findOne({ 'aadharno': aadhar }, (err, parent) => {
        if (err)
            console.log(err);
        else {
            if (parent != null) {
                console.log("Crash Point!!");
                console.log("Returned Json" + parent)
                res.render("parent.ejs", { Parent: parent });
            }
        }
    })
})



router.get("/parent/:aadharno/children", (req, res) => {
    var retrieved_children = [];
    var aadhar = req.params.aadharno;
    console.log("Aadhar no. " + aadhar);
    Parent.findOne({ 'aadharno': aadhar }, (err, parent) => {
        if (err)
            console.log(err)
        else {
            var children = [];
            retrieved_children = [];
            children = parent.children;
            children.forEach(async (child_id) => {
                Child.findOne({ _id: child_id }, (err, details_child) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (details_child) {
                            retrieved_children.push(details_child);
                            console.log(retrieved_children);
                        }
                    }
                })
            });
            setTimeout(() => {
                console.log('gotcha' + retrieved_children);
                // res.send(retrieved_children);
                res.render("children.ejs", { Child: retrieved_children });
            }, 500)
        }
    })
})

router.put("/children/:child_id/update", (req, res) => {
    var child = req.params.child_id
    console.log("aa gaya");
    console.log("child no. " + child);
    console.log(req.body);
    ward_changes = req.body;
    console.log(req.body);
    updated_child = [];
    // var vac = req.body.vacc-name;
    // var dat = req.body.vacc-date;
    Child.update({ '_id': child }, { $push: { vaccinations: [{ disease: req.body.new_vacc, duedate: req.body.new_vacc_date }] } }, (err, child) => {
        if (err)
            console.log(err);
        else {
            console.log("Updated Succesfully!!");
            Child.findOne({ '_id': req.params.child_id }, (err, ward) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(ward);
                    updated_child.push(ward);
                    res.render("children.ejs", { Child: updated_child });
                }
            })
        }
    })
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;