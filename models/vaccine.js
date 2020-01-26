var mongoose = require('mongoose');
const vaccineSchema = new mongoose.Schema({
    disease: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: false
    }
});
module.exports = vaccineSchema;