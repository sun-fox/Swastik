var express = require("express");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose'),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    Parent = require("./models/parent"),
    Child = require("./models/child");
var ejs = require("ejs");
var registerRoute = require('./routes/register');
var protectRoute = require('./routes/protect');
var loginRoute = require('./routes/login');
var signupRoute = require('./routes/signup');
var clientRoute = require('./routes/client');
var messageRoute = require('./routes/message');
var statisticsRoute = require('./routes/stats');
var searchRoute = require('./routes/search_client');
var complainRoute = require('./routes/complain');

mongoose.connect(process.env.LOCALDB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'swastik'
  }).then(()=>{
      console.log("db connected!!");
  }).catch((e)=>{
    console.log('Database connectivity error ',e)
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
app.use('/Client',clientRoute);
app.use('/Message',messageRoute);
app.use('/Statistics',statisticsRoute);
app.use('/Search',searchRoute);
app.use('/Complain',complainRoute);

app.get('/Contacts', (req, res) => {
    res.render('contact');
})

app.get('/admin',(req,res)=>{
    res.render("admin");
});
app.get('/dashboard',(req,res)=>{
    res.render("dashboard");
})
app.get('/gallery',(req,res)=>{
    res.render("gallery");
})

app.get("/", function (req, res) {
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
        // res.send(count_JSON);
        res.render("index.ejs",{Data:count_JSON});
    },500)
})

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("started!!!");
})
