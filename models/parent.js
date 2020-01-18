var mongoose = require('mongoose');
var Address = require('./address');
var Child = require('./child');
const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phoneno: {
        type: String,
        required: true
    },
    spouse: {
        type: String,
        required: true
    },
    children: [Child],
    aadharno: {
        type: String,
        requied: true
    },
    address:[Address],
    gender:{
        type:String,
        required: true
    }
});
var Parent = mongoose.model('parent', parentSchema);
module.exports = Parent;