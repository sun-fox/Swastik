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

     var path = require("path");
     var ejs = require("ejs");

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
    
    router.post("/people", (req, res) => {
       console.log("reached in find people");
       // finding child name
         var findItem = req.body.anyname;
         findChild(res,findItem);
         findParent(res,findItem);
         findDisease(res,findItem);
         findEmail(res,findItem);
         findPhone(res,findItem);
         findAadhar(res,findItem);
         findState(res,findItem);
         findCity(res,findItem);
         findPincode(res,findItem);
         findProvince(res,findItem);
         findDob(res,findItem);
    });//post people

    function findChild(res,findItem)
    {
        findItem = toTitleCase(findItem);
        Child.find({ "name": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//child findone
    }//findchild function

    function findParent(res,findItem)
    {
        findItem = toTitleCase(findItem);
        Parent.find({ "name": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//parent findone
    }//findParent function

    function findDisease(res,findItem)
    {
        findItem = toTitleCase(findItem);
        Child.find({ "vaccinations.disease": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//disesase findone
    }//finddisease function

    function findEmail(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//email findone
    }//findEmail function

    function findPhone(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//phone findone
    }//findPhone function

    function findAadhar(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//Aadhar findone
    }//findAadhar function

    function findState(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//State findone
    }//findState function


    function findCity(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//city findone
    }//findCity function

    function findProvince(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//province findone
    }//findProvince function

    function findPincode(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//pincode findone
    }//findPincode function

    function findDob(res,findItem)
    {
        Parent.find({ "email": findItem }, (err, ward) => {
            if (err) {
                console.log(err);
                /* res.render('findResult',{ status : "Search did'nt Matched !"}) */;
            }
            else if(ward.length > 0) {
                console.log(ward.name);
                res.render('findResult',{ward : ward, status : "Search Matched !"});
            }//else if
            else{
                console.log("No result");
                res.render('findResult',{ status : "Search did'nt Matched !"});
            }
        });//dob findone
    }//findDob function


    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }


    module.exports = router;