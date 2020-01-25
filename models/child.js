var mongoose = require('mongoose');
const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Mparent_id: {
        type: String,
        required: true
    },
    Fparent_id: {
        type: String,
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
    address: [{
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
            required: false
        },
        town_village: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    }]
});
var Child = mongoose.model('child', childSchema);
module.exports = Child;