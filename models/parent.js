var mongoose = require('mongoose');
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
    children: [{
        type: String,
        required: false
    }],
    aadharno: {
        type: String,
        requied: true
    },
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
    }],
    gender: {
        type: String,
        required: true
    }
});
var Parent = mongoose.model('parent', parentSchema);
module.exports = Parent;