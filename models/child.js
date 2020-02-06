var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const addressSchema = require('../models/address');
const vaccineSchema = require('../models/vaccine');
const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
<<<<<<< HEAD
=======
    image:{
        type:String,
        required:false
    },
>>>>>>> upstream/master
    Mphoneno: {
        type:String,
        required: true
    },
    Fphoneno: {
        type:String,
        required: true
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
        required: false
    },
    vaccinations: [vaccineSchema],
    address: [addressSchema]
});
childSchema.plugin(mongooseUniqueValidator);
var Child = mongoose.model('Child', childSchema);
module.exports = Child;