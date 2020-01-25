var express = require("express");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose'),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");
var ejs = require("ejs");
var registerRoute = require('./routes/register');
var protectRoute = require('./routes/protect');
var loginRoute = require('./routes/login');
var signupRoute = require('./routes/signup');

mongoose.connect("mongodb://localhost/swastik", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("db connected");
});

app.use(require("express-session")({
    secret:"secret!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");   ///set template engine to ejs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//it will have two routes 1. search 2. result
app.use("/public", express.static(__dirname + '/public'));
app.use('/Register', registerRoute);
app.use('/Login', loginRoute);
app.use('/Signup', signupRoute);
app.use('/Protected',protectRoute);
app.get('/contacts', (req, res) => {
    res.render('contact');
})

app.get("/", function (req, res) {
    res.send("index page will be here");
})


app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("started!!!");
})
