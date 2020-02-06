var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const complainSchema = new mongoose.Schema({
    complainer: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    }
});
complainSchema.plugin(mongooseUniqueValidator);
var Complain = mongoose.model('Complain', complainSchema);
module.exports = Complain;