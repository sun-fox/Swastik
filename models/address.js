var mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
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
});
module.exports = addressSchema;