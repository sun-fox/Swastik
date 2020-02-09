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
var findRoute = require('./routes/find');
var caseRegisterRoute = require('./routes/case_register');
var QRCode = require('qrcode'); // for qrcode
var pdf = require('html-pdf');
var requestify = require('requestify');

/* including my twilio acc  */
const { MessagingResponse } = require('twilio').twiml;
const accountSid = 'AC49280ab194cc76ba75d4783d5f68a391';
const authToken = 'e1b3f04e85ef2fab83a317d21212227d';
const client = require('twilio')(accountSid, authToken);
const goodBoyUrl = 'https://lh3.googleusercontent.com/proxy/7q7Wx47mCOpMZC0_1j2RQNnNq7HEgCk5sjzIsyMw_meUpr2Xbyoy8BuyI1JFuAUU3gTrmyM2py04BPttN979w-c775WUwtyFwh6JQqHNG6GC0ZYNkiiBLKpPsB9xikmAm_1CWBDpBXwamn_Y-z_1BWmWXPWWBmqAZnJ6FbhuIPsCNAKO';


mongoose.connect(process.env.LOCALDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'swastik'
}).then(() => {
    console.log("db connected!!");
}).catch((e) => {
    console.log('Database connectivity error ', e)
});

app.use(require("express-session")({
    secret: "secret!",
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
app.use('/Protected', protectRoute);
app.use('/Client', clientRoute);
app.use('/Message', messageRoute);
app.use('/Statistics', statisticsRoute);
app.use('/Search', searchRoute);
app.use('/Complain', complainRoute);
app.use('/Find',findRoute);
app.use('/Case', caseRegisterRoute);

app.get('/Contacts', (req, res) => {
    res.render('contact');
})

app.get('/admin', (req, res) => {
    res.render("admin");
});
app.get('/dashboard', (req, res) => {
    res.render("dashboard");
})
app.get('/gallery', (req, res) => {
    res.render("gallery");
})

app.get("/qrread", (req, res) => {
    res.render("qrcode");
});

app.get("/",function (req, res) {
    var male_parents = [];
    var female_parents = [];
    var male_childs = [];
    var female_childs = [];
    Parent.find({}, (err, parent) => {
        if (err) {
            console.log("error");
        }
        else {
            setTimeout(() => {
                parent.forEach((parent) => {
                    if (parent.gender == 'M') {
                        male_parents.push(parent);
                    }
                    else if (parent.gender == 'F') {
                        female_parents.push(parent);
                    }
                })
            }, 100);
        }
    });
    Child.find({}, (err, child) => {
        if (err) {
            console.log("error");
        }
        else {
            setTimeout(() => {
                child.forEach((child) => {
                    if (child.gender == 'M') {
                        male_childs.push(child);
                    }
                    else if (child.gender == 'F') {
                        female_childs.push(child);
                    }
                })
            }, 100);
        }
    });

    //count of children on the basis of vaccines(copied from stats.js) starts
    var map = {};
    Child.find({}, (err, ward) => {
        if (err) {
            console.log(err);
        }
        else {
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
                /* for (var key in map) {
                    if (map.hasOwnProperty(key)) {
                      var val = map[key];
                      console.log(key);
                      console.log(val);
                    }
                  } */
                //console.log(key);
                // res.send(map);
            }, 100);
        }
    });
    //count of children on the basis of vaccines(copied from stats.js) ends
    setTimeout(() => {
        var count_JSON = {
            'Male Parents Count': male_parents.length,
            'Female Parents Count': female_parents.length,
            'Male Children Count': male_childs.length,
            'Female Children Count': female_childs.length,
        }
        // res.send(count_JSON);
        var labls = [];
        var dat = [];
        for (let [key, value] of Object.entries(map)) {
            labls.push(`${key}`);
            dat.push(`${value}`)
        }
        var dt = [];
        dat.forEach((x) => {
            dt.push(Number(x));
        });
        console.log(dt);
        console.log(labls);
        res.render("index.ejs", { Data: count_JSON, labls: labls, dt: dt, gdata: map ,display :false});
    }, 500)
})

//  this is for whatsapp message sending ...
app.get('/whatsapp', (req, res) => {
    res.render('sendwhats');
})

app.post('/whatsapp', (req, res) => {

    const linkimg = req.body.link;
    const message = req.body.message;



    client.messages.create({
        to: "whatsapp:+918957790795",
        from: "whatsapp:+14155238886",
        body: message,
        mediaUrl: linkimg
    }).then(message => {
        
        console.log("message sent");
        console.log(message.sid);
    }).catch(err => console.log(err));


    res.render('confirm');

});


// this part is for whatsapp messages recieving ... 
app.post('/recieve', async (req, res) => {
    const { body } = req;
    var message;
    
    res.set('Content-Type', 'text/xml');
    console.log(body);
   
    // console.log(replytohelp);
    if (body.NumMedia > 0) {
        message = new MessagingResponse().message("this is invalid message ");
        message.media(goodBoyUrl);
    } else {
        var replymsg = "";
        if ((body.Body).toString() == ("hello") || (body.Body).toString() == "Hello" || (body.Body).toString() == "hi" || (body.Body).toString() == "Hi" || (body.Body).toString() == "COMPLAIN" || (body.Body).toString() == "complain")
            replymsg = "Hello Welcome to Swastik Helpline ... SEND US YOUR QUERY IN GIVEN CODE  to register Complain append 'COMPLAIN' in front of your message.'";
        else if ((body.Body).toString()== ("HELP")) {
                  
            var replyto="";   
            var replyno = (body.From).toString();
            var replynumber = replyno.split("+91");
            Parent.find({phoneno:replynumber},(err,data)=>{
                if(err)
                console.log(err);
                else{
                    var addressReply=(data[0].address);
                   // console.log(addressReply);
                    var addressString = addressReply[0];
                    var replytohelp = "";
                   replytohelp+=(addressString.line1).toString()+" ";
                   replytohelp+=addressString.line2.toString()+" ";
                   replytohelp+=addressString.town_village.toString()+" ";
                   replytohelp+=addressString.province.toString()+" ";
                   replytohelp+=addressString.state.toString()+" ";
                   replyto = replytohelp+"  https://www.google.com/maps/place/"+(addressString.town_village.toString());
                   console.log("replyto"+replyto);
                   //console.log(replytohelp);
          
                 }
         
             });//function end of parent
            setTimeout(() => {
                    
            console.log(replyto);
            // console.log("thiis is  maAL:"+replyto);


            replymsg =replyto;
                
            }, 1000);// set timeout end
       
        }
        else
            replymsg = "this is invalid message for queries check here : https://www.hackerearth.com/@hyper_bit ";
        
            setTimeout(() => {
                message = new MessagingResponse().message(replymsg.toString());
            }, 1200);
        
    }
    setTimeout(() => {
        
    res.send(message.toString());
    }, 1300);
});



// sending message to array
app.get('/message/calluser',(req,res)=>{
      
    
const accountSi = 'AC63dcb9c07e6cd8596c032a8ff5e59b1f';
const authToke = '8006f3f18dda3891ff9e6c10f899f393';
const client = require('twilio')(accountSi, authToke);

client.calls.create({
   url:'http://demo.twilio.com/docs/voice.xml',
   to : '+918957790795',
   from :'+1 218 297 0768' 
},(err,call)=>{
    if(err)
    console.log(err);
    else
    console.log(call.sid);
});

res.redirect('/admin');

});

app.get('/start', (req, res) => {
    res.render('login');

});

const noss = {
    1: 123456,
    2: 987654,
    3: 129381,
    4: 107236,
    5: 127812,
    6: 123612,
    7: 123123,
    8: 123781,
};

app.get('/shownos', (req, res) => {

    res.render("printnos", { contactnos: noss });
});

app.get('/casereg', (req, res) => {

    res.render("casereg");
});


app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

/* requestify.get("/Register/regSuccess").then(function (res) {
    // Get the raw HTML response body
    var html = res.body; 
    var config = {format: 'A4'}; // or format: 'letter' - see https://github.com/marcbachmann/node-html-pdf#options
 
 // Create the PDF
    pdf.create(html, config).toFile('pathtooutput/generated.pdf', function (err, res) {
       if (err) return console.log(err);
       console.log(res); // { filename: '/pathtooutput/generated.pdf' }
    });
 }); */




 
app.listen(process.env.PORT || 3000, function () {
    console.log("started!!!");
});
