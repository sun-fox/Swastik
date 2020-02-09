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
    var numbers = /^[0-9]+$/;
    var result = [];
    result = findChild(res, findItem);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 100);

    setTimeout(() => {
        result = findParent(res, findItem);
    }, 150);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 200);

    setTimeout(() => {
        result = findDisease(res, findItem);;
    }, 250);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 300);

    setTimeout(() => {
        result = findPhone(res, findItem);
    }, 350);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 400);

    setTimeout(() => {
        result = findEmail(res, findItem);
    }, 450);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 500);

    setTimeout(() => {
        result = findAadhar(res, findItem);
    }, 550);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 600);

    setTimeout(() => {
        result = findState(res, findItem);
    }, 650);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 700);

    setTimeout(() => {
        result = findPincode(res, findItem);
    }, 750);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 800);

    setTimeout(() => {
        result = findProvince(res, findItem);
    }, 850);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 900);

    setTimeout(() => {
        result = findCity(res, findItem);
    }, 950);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 1000);

    setTimeout(() => {
        result = findDob(res, findItem);
    }, 1050);
    setTimeout(() => {
        checkResult(res, result, findItem);
    }, 1100);

    setTimeout(() => {
        res.render('findResult', { child: null, parent: null, status: "Search Results Related to '" + findItem + "' did'nt matched." });
    }, 1150);

    /*  findPhone(res,findItem);
     findParent(res,findItem);
     findDisease(res,findItem);
     findEmail(res,findItem);
     findAadhar(res,findItem);
     findState(res,findItem);
     findCity(res,findItem);
     findPincode(res,findItem);
     findProvince(res,findItem);
     findDob(res,findItem); */


}); //post people

function checkResult(res, result, findItem) {
    if (result) {
        console.log("i am inside checkresults");
        if (result.length > 0) {
            console.log("checkresult if");
            renderResult(res, result, findItem)
        }
    }
} //check result

function renderResult(res, result, findItem) {
    console.log("i am inside renderResult");
    if (result[0].length > 0 || result[1].length > 0) {
        res.render('findResult', { child: result[0], parent: result[1], status: "Search Results Related to ' " + findItem + " '" });
    } else {
        res.render('findResult', { child: null, parent: null, status: "Search Results Related to '" + findItem + "' did'nt matched." });
    }
} //renderResult


function findChild(res, findItem) {
    console.log("I am inside findChild");
    var result = [];
    findItem = toTitleCase(findItem);
    Child.find({ "name": findItem }, (err, child) => {
        if (err) {
            console.log("error in findChild : " + err);
        } else if (child.length > 0) {
            console.log("inside findChild : " + child);
            result[0] = child;
            result[1] = [];
        } //else if
        else {
            console.log("No result in findchild");
        }
    }); //child findone
    return result;
} //findchild function

function findParent(res, findItem) {
    console.log("i am inside findParent");
    var result = [];
    findItem = toTitleCase(findItem);
    Parent.find({ "name": findItem }, (err, parent) => {
        if (err) {
            console.log("error in findParent : " + err);
        } else if (parent.length > 0) {
            console.log("inside findparent : " + parent);
            result[0] = [];
            result[1] = parent;
        } //else if
        else {
            console.log("No result in findParent");
        }
    }); //parent findone
    return result;
} //findParent function

function findDisease(res, findItem) {
    console.log("i am inside findDisease");
    var result = [];
    findItem = toTitleCase(findItem);
    Child.find({ "vaccinations.disease": findItem }, (err, child) => {
        if (err) {
            console.log("error in findDisease :" + err);
        } else if (child.length > 0) {
            console.log("inside findDisease :" + child);
            result[0] = child;
            result[1] = [];
        } //else if
        else {
            console.log("No result in findDisease");
        }
    }); //disesase findone
    return result;
} //finddisease function

function findEmail(res, findItem) {
    console.log("i am inside findEmail");
    var result = [];
    Parent.find({ "email": findItem }, (err, parent) => {
        if (err) {
            console.log("error in findEmail :" + err)
        } else if (parent.length > 0) {
            console.log(" inside findEmail : " + parent);
            result[0] = [];
            result[1] = parent;
        } //else if
        else {
            console.log("No result in findEmail");
        }
    }); //email findone
    return result;
} //findEmail function

function findPhone(res, findItem) {
    console.log("i am inside findPhone");
    var result = [];
    Parent.find({ "phoneno": findItem }, (err, parent) => {
        if (err) {
            console.log("error inside findPhone parent :" + err);
        } else if (parent.length > 0) {
            console.log("inside findPhone parent :" + parent);

            // finding children with this number
            Child.find({ "Fphoneno": findItem }, (err, child) => {
                if (err) {
                    console.log("error inside findPhone child" + err);
                } else if (child.length > 0) {
                    console.log("inside findPhone child father : " + child);
                    result[0] = child;
                    result[1] = parent;
                } //else if
                else {
                    console.log(" inside findPhone child mother ");
                    /*  result[0] = child;
                     result[1] = parent; */
                    Child.find({ "Mphoneno": findItem }, (err, child) => {
                        if (err) {
                            console.log("error inside findPhone child" + err);
                        } else if (child.length > 0) {
                            console.log("inside findPhone child : " + child);
                            result[0] = child;
                            result[1] = parent;
                        } //else if
                        else {
                            console.log(" No result in findPhone child");
                            result[0] = child;
                            result[1] = parent;
                        }
                    }); //phone findone
                } //else of child
            }); //phone findone
        } //else if
        else {
            console.log("No result in findPhone parent");
        }
    }); //phone findone
    return result;
} //findPhone function

function findAadhar(res, findItem) {
    console.log("i am inside findAadhar");
    var result = [];
    Parent.find({ "aadharno": findItem }, (err, parent) => {
        if (err) {
            console.log("error inside findAadhar :" + err)
        } else if (parent.length > 0) {
            console.log("inside findAadhar : " + parent);
            result[0] = [];
            result[1] = parent;
        } //else if
        else {
            console.log("No result inside findAadhar");
        }
    }); //Aadhar findone
    return result;
} //findAadhar function

function findState(res, findItem) {
    console.log("i am inside findState");
    var result = [];
    Parent.find({ "address.state": findItem }, (err, parent) => {
        if (err) {
            console.log("error inside findState : " + err);
        } else if (parent.length > 0) {
            console.log("inside findState :" + parent);
            Child.find({ "address.state": findItem }, (err, child) => {
                if (err) {
                    console.log("error inside findState child" + err);
                } else if (child.length > 0) {
                    console.log("inside findState child : " + child);
                    result[0] = child;
                    result[1] = parent;
                } //else if
                else {
                    console.log(" No result in findState child");
                    result[0] = child;
                    result[1] = parent;
                }
            }); //phone findone
        } //else if
        else {
            console.log("No result inside findState");
        }
    }); //State findone
    return result;
} //findState function


function findCity(res, findItem) {
    console.log("i am inside findCity");
    var result = [];
    Parent.find({ "address.town_village": findItem }, (err, parent) => {
        if (err) {
            console.log("errro inside findCity :" + err)
        } else if (parent.length > 0) {
            console.log("inside findCity : " + parent);
            Child.find({ "address.town_village": findItem }, (err, child) => {
                if (err) {
                    console.log("error inside findCity child" + err);
                } else if (child.length > 0) {
                    console.log("inside findCity child : " + child);
                    result[0] = child;
                    result[1] = parent;
                } //else if
                else {
                    console.log(" No result in findState child");
                    result[0] = child;
                    result[1] = parent;
                }
            }); //phone findone
        } //else if
        else {
            console.log("No result inside findState");
        }
    }); //city findone
    return result;
} //findCity function

function findProvince(res, findItem) {
    console.log("i am inside findProvince");
    var result = [];
    Parent.find({ "address.province": findItem }, (err, parent) => {
        if (err) {
            console.log("error inside findProvince :" + err)
        } else if (parent.length > 0) {
            console.log("inside findProvince :" + parent);
            Child.find({ "address.province": findItem }, (err, child) => {
                if (err) {
                    console.log("error inside findProvince child" + err);
                } else if (child.length > 0) {
                    console.log("inside findProvince child : " + child);
                    result[0] = child;
                    result[1] = parent;
                } //else if
                else {
                    console.log(" No result in findProvince child");
                    result[0] = child;
                    result[1] = parent;
                }
            }); //phone findone

        } //else if
        else {
            console.log("No result inside findProvince");
        }
    }); //province findone
    return result;
} //findProvince function

function findPincode(res, findItem) {
    console.log("i am inside findPincode");
    var result = [];
    Parent.find({ "address.pincode": findItem }, (err, parent) => {
        if (err) {
            console.log("error inside findPincode :" + err)
        } else if (parent.length > 0) {
            console.log("inside findPincode :" + parent);
            Child.find({ "address.pincode": findItem }, (err, child) => {
                if (err) {
                    console.log("error inside findPincode child" + err);
                } else if (child.length > 0) {
                    console.log("inside findPincode child : " + child);
                    result[0] = child;
                    result[1] = parent;
                } //else if
                else {
                    console.log(" No result in findPincode child");
                    result[0] = child;
                    result[1] = parent;
                }
            }); //phone findone
        } //else if
        else {
            console.log("No result inside findPincode");
        }
    }); //pincode findone
    return result;
} //findPincode function

function findDob(res, findItem) {
    console.log("i am inside findDob");
    var result = [];
    Child.find({ "DOB": findItem }, (err, child) => {
        if (err) {
            console.log("error inside findDob :" + err);
        } else if (child.length > 0) {
            console.log(child);
            result[0] = child;
            result[1] = []
        } //else if
        else {
            console.log("No result inside findDob");
        }
    }); //dob findone
    return result;
} //findDob function


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


module.exports = router;