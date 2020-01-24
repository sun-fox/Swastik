var mongoose = require('mongoose');
var Address = require('./address');
var Parent = require('./parent');
const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // parent:[Parent],
    Mphoneno: {
        type: String,
        required: false
    },
    Fphoneno: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    siblings: {
        type: Number,
        required: true
    },
    aadharno: {
        type: String,
        requied: false
    },
    vaccinations: [{
        disease: {
            type: String,
            requied: false
        }, 
        duedate: { 
            type: String, 
            required: false 
        }
    }],
    address: [Address]
});
var Child = mongoose.model('child', childSchema);
module.exports = Child;