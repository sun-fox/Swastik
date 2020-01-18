var mongoose = require('mongoose');
var Address = require('./address');
var Parent = require('./parent');
const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent:[Parent],
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    siblings: {
        type: Number,
        required: true
    },
    aadharno: {
        type: String,
        requied: true
    },
    address: [Address]
});
var Child = mongoose.model('child', childSchema);
module.exports = Child;