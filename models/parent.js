var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const addressSchema = require('../models/address');
const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:false
    },
    email: {
        type: String,
        unique: true,
        required: false
    },
    phoneno: {
        type: String,
        unique: true,
        required: true
    },
    spouse: {
        type: String,
        required: true
    },
    children: [{
        type: String,
        required: false
    }],
    aadharno: {
        type: String,
        unique: true,
        requied: true
    },
    address: [addressSchema],
    gender: {
        type: String,
        required: true
    }
});
parentSchema.plugin(mongooseUniqueValidator);
var Parent = mongoose.model('Parent', parentSchema);
module.exports = Parent;