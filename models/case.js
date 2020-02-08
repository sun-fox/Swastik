var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const caseSchema = new mongoose.Schema({
    patient: {
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    DOA:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required: true
    },
    disease:[{
        type: String,
        required: true
    }],
    Effect:{
        type:String,
        required:true
    }
});
caseSchema.plugin(mongooseUniqueValidator);
var Case = mongoose.model('Case', caseSchema);
module.exports = Case;