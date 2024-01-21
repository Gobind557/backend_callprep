const mongoose = require('mongoose');
const studentSchema2 = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    years_old: {
        type: String,
        required: true
    },
    scores: {
        subjects: {
            type: [String],
            required: true,
           
        },
        marks_obtained: {
            type: [Number],
            required: true
        },
        total_marks: {
            type: [Number],
            required: true
        }
    }
});
module.exports = mongoose.model('Student2', studentSchema2);
// Create a mongoose model based on the schema