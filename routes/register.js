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
var multer = require('multer');
var upload = multer({ dest: './public/uploads' }); // to get image file as input
var expressValidator = require('express-validator');
var QRCode = require('qrcode'); // qr code generator
var path = require("path");
var fs = require("fs");
var pdf = require("html-pdf");
var ejs = require("ejs");
router.use(expressValidator());
var PDFDocument = require('pdfkit');
var bwipjs = require('bwip-js');

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

router.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

router.get("/", isLoggedIn, (req, res) => {
    res.send("Go to home page nothing here!!");
})

router.get("/parent", (req, res) => {
    res.render("regParent");
});


router.post("/parent", upload.single('image'), (req, res, next) => {
    console.log(req.body);
    parent = new Parent(req.body);
    var formData = req.body;
    if (req.file) {
        console.log("Uploading....");
        var image = req.file.filename; // file is used to get image
        formData.image = "../../../public/uploads/"+image;
        // from register body
        console.log("image name : " + image);
    }
    else {
        console.log("No file uploaded....");
        var image = "noimage.jpg";
    }
    //form validator

    req.checkBody('name', "Name field is required").notEmpty();
    req.checkBody('name', "Name is not valid").isString();
    req.checkBody('email', "Email field is required").notEmpty();
    req.checkBody('email', "Invalid Email").isEmail();
    req.checkBody('phoneno', "Phoneno field is required").notEmpty();
    req.checkBody('phoneno', "Phoneno is not valid").isNumeric().isLength({ min: 10, max: 10 });
    req.checkBody('spouse', "Spouse field is required").notEmpty();
    req.checkBody('spouse', "Spouse field is not valid").isString();
    req.checkBody('aadharno', "Aadharno field is required ").notEmpty();
    req.checkBody('aadharno', "Aadharno field is not valid ").isNumeric().isLength({ min: 12, max: 12 });
    req.checkBody('address[0][line1]', "Line 1 field is required").notEmpty();
    req.checkBody('address[0][line2]', "Line 2 field is required").notEmpty();
    req.checkBody('address[0][town_village]', "City field is required").notEmpty();
    req.checkBody('address[0][town_village]', "City is not valid").isString();
    req.checkBody('address[0][province]', "Province field is required").notEmpty();
    req.checkBody('address[0][province]', "Province is not valid").isString();
    req.checkBody('address[0][pincode]', "Pincode field is required").notEmpty();
    req.checkBody('address[0][pincode]', "Pincode is not valid").isNumeric();
    req.checkBody('address[0][state]', "State field is required").notEmpty();
    req.checkBody('address[0][state]', "State is not valid").isString();

    //check errors
    var errors = req.validationErrors(); // storing all the errors in the array
    if (errors) {
        console.log("msg is filled now giong to send");
        res.render("regParent", {
            errors: errors,
            formData: formData
        });// sending errors array to register page to display
    }
    else {
        parent.save((err, parent) => {
            if (err) {
                console.log("Error a gaya !!" + err);
            }
            else if (parent._id) {
                console.log("Data Successfully Added " + parent.name + " , " + parent.spouse + " , " + parent.children);
                Parent.findOne({ '_id': parent._id }, (err, parent) => {
                    if (err)
                        console.log(err)
                    else {
                        
                        console.log("Returned Parent JSON ");
                        //res.send(parent);
                       // console.log("parent id : "+parent._id);
                       // var parent_id = parent._id.toString();
                        
                           // console.log("created qr code : "+url);
                            //res.render('index', {qr: url});
                           /*  var css1 = '<link rel="stylesheet" href="/home/adarsh/Swastik/public/stylesheets/bootstrap.min.css">';
                            var css2 = '<link rel="stylesheet" href="/home/adarsh/Swastik/public/stylesheets/regSuccess.css">'; */
                
                           /*  ejs.renderFile(path.join(__dirname, '../views/', "regdataParent.ejs"), { formData: formData, image: image }, (err, data) => {
                                if (err) {
                                    
                                     console.log("RENDERfile error :"+err);
                                } else {
                                    var options = {
                                        "height": "11.25in",
                                        "width": "8.5in",
                                        "header": {
                                            "height": "20mm"
                                        },
                                        "footer": {
                                            "height": "20mm",
                                        },
                                        "base": "http://localhost:3000" 
                                    };
                                    pdf.create(data, options).toFile("Details.pdf", function (err, data) {
                                        if (err) {
                                           
                                           console.log("PDF CREATE error :"+err);
                                        } else {
                                           
                                           console.log("PDF CREATED successfully");
                                        }
                                    });
                                }
                            }); */// renderFile
                            barcode = "/public/images/barcode.jpg";
                            res.render('regdataParent', { formData: formData, image: image,barcode : barcode  });
                       // res.render('regdataParent', { formData: formData, image: image });
                    }//else
                });//findone
            }//else if
        });//parent.save
    }//else after succesfully validating
});//router.post


router.get("/child", (req, res) => {
    res.render("regChild");
});
// child route
router.post("/child", upload.single('image'), (req, res) => {
    var formData = req.body;

    if (req.file) {
        console.log("Uploading....");
        var image = req.file.filename; // file is used to get image
        formData.image = "../../../public/uploads/"+image;
        // from register body
    }
    else {
        console.log("No file uploaded....");
        var image = "noimage.jpg";
    }
    //form validator

    req.checkBody('name', "Name field is required").notEmpty();
    req.checkBody('name', "Name is not valid").isString();
    req.checkBody('DOB', "Date of birth field is required").notEmpty();
    req.checkBody('Fphoneno', "Father's Phoneno field is required").notEmpty();
    req.checkBody('Fphoneno', "Father's Phoneno is not valid").isMobilePhone();
    req.checkBody('Mphoneno', "Mother's Phoneno field is required").notEmpty();
    req.checkBody('Mphoneno', "Mother's Phoneno is not valid").isMobilePhone();
    req.checkBody('siblings', "Siblings is required ").notEmpty();
    req.checkBody('siblings', "Siblings is not valid").isNumeric();
    // req.checkBody('aadharno', "Aadharno field is required ").notEmpty();
    // req.checkBody('aadharno', "Aadharno field is not valid ").isNumeric().isLength({ min: 12, max: 12 });
    req.checkBody('address[0][line1]', "Line 1 field is required").notEmpty();
    req.checkBody('address[0][line2]', "Line 2 field is required").notEmpty();
    req.checkBody('address[0][town_village]', "City field is required").notEmpty();
    req.checkBody('address[0][town_village]', "City is not valid").isString();
    req.checkBody('address[0][province]', "Province field is required").notEmpty();
    req.checkBody('address[0][province]', "Province is not valid").isString();
    req.checkBody('address[0][pincode]', "Pincode field is required").notEmpty();
    req.checkBody('address[0][pincode]', "Pincode is not valid").isNumeric();
    req.checkBody('address[0][state]', "State field is required").notEmpty();
    req.checkBody('address[0][state]', "State is not valid").isString();


    //check errors
    var errors = req.validationErrors(); // storing all the errors in the array
    if (errors) {
        console.log("msg is filled now giong to send");
        res.render("regChild", {
            errors: errors,
            formData: formData
        });// sending errors array to register page to display
    }
    else {
        var parentJSON = [];
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
                                console.log("Parent present " + parent_contact_no);
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
                        setTimeout(() => {
                            // res.send(parentJSON);
                            QRCode.toDataURL(child._id.toString(), function (err, url) {
                                // console.log("created qr code : "+url);
                                 //res.render('index', {qr: url});
                                res.render('regdataChild', { formData: formData, image: image  });
                                 });// qrcode
                            //res.render("regdataChild", { formData: formData, image: image });
                        }, 500);
                    }
                })
            }
        });
    }// else after successful validation
});

router.post('/downloadPdf', (req, res) => {
    console.log("reached in download pdf");
    const doc = new PDFDocument();
    const filename = 'my_pdf.pdf';
    var name = req.body;
    var allData = "Registraton Details " ,image="";
    image = "/home/adarsh/Swastik";
    name.image = image+name.image;
    Object.keys(name).forEach(function(k){ 
        if(k != "image"){
        allData = allData+"\n"+k+"      "+name[k];
        }
       // console.log(k + ' - ' + name[k]);
    });
    console.log("image : "+name.image);
    //console.log("download pdf : "+allData);
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
  
    const content = allData;
    barcode = "/home/adarsh/Swastik/public/images/barcode.jpg";
    doc.y = 300;
    //doc.image(name.image,50,50);
    doc.image(name.image, {
        fit: [250, 300],
        align: 'left',
        valign: 'left',
      });
      doc.image(barcode, {
        fit: [250, 300],
        align: 'right',
        valign: 'right',
      });
    doc.text(content, 50, 50);
    doc.pipe(res);
    doc.end();
  });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Access Denied!!")
    res.redirect("/login");
}

module.exports = router;