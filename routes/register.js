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

router.get("/parent",(req,res)=>{
    res.render("regParent");
});

router.post("/parent", (req, res) => {
    console.log(req.body);
    parent = new Parent(req.body);
    parent.save((err, parent) => {
        if (err)
            console.log("Error a gaya !!" + err);
        else if (parent._id) {
            console.log("Data Successfully Added " + parent.name + " , " + parent.spouse + " , " + parent.children);
            Parent.findOne({ '_id': parent._id }, (err, parent) => {
                if (err)
                    console.log(err)
                else {
                    console.log("Returned Parent JSON ");
                    res.send(parent);
                }
            });
        }
    });
});


router.get("/child",(req,res)=>{
    res.render("regChild");
});

router.post("/child", (req, res) => {
    var parentJSON=[];
    child = new Child(req.body);
    console.log(child);
    child.save((err, child) => {
        if (err)
            console.log("Error a gaya !!" + err);
        else if (child._id) {
            console.log("Data Successfully Added " + child.name + " , " + child.Mphoneno + " , " + child.Fphoneno)
            Child.findOne({ '_id': child._id }, (err, ward) => {
                if (err)
                    console.log(err)
                else {
                    // Query for its parents and then adding the child id to their children column in database.
                    var fatherno = ward.Fphoneno;
                    var motherno = ward.Mphoneno;
                    var parent_array = [fatherno, motherno];
                    parent_array.forEach(parent_contact_no => {
                        console.log(parent_contact_no);
                        if (parent_contact_no) {
                            console.log("Parent present "+parent_contact_no);
                            Parent.findOne({ phoneno: parent_contact_no }, (err, parent) => {
                                console.log("Found parent");
                                if (err) {
                                    console.log("Error in finding parent with the no " + err);
                                }
                                else {
                                    console.log(parent);
                                    var updatedParent = parent;
                                    updatedParent.children.push(child._id);
                                    console.log(updatedParent);
                                    Parent.update({ '_id': updatedParent._id }, { $set: updatedParent }, (err, parent) => {
                                        if (err)
                                            console.log(err)
                                        else {
                                            console.log("Updated Succesfully!!");
                                            Parent.findOne({ '_id': updatedParent._id }, (err, gaurdian) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log(gaurdian);
                                                    parentJSON.push(gaurdian);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            console.log("Father is not in the database for " + ward.name);
                            res.send(ward);
                        }
                    });
                    setTimeout(()=>{
                        res.send(parentJSON);
                    },500);
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