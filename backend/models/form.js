const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String
    },
    fields: {
        type: Array,
    },
    submissions: {
        type: Array,
    }
});
module.exports = mongoose.model('Form', formSchema);