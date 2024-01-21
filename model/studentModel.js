
const mongoose = require('mongoose');
 studentSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    rollno: Number,
    marks: {
        physics: {
            type: [Number, Number],
            validate: {
                validator: function (value) {
                    // Ensure marks obtained is not greater than total marks
                    return value[0] >= 0 && value[0] <= value[1];
                },
                message: 'Invalid marks for physics. Marks obtained cannot be negative, and it should be less than or equal to total marks.'
            }
        },
        chemistry: {
            
            type: [Number, Number],
            required:false,
            validate: {
                validator: function (value) {
                    // Validate only if chemistry marks are provided
                    if (value && value.length === 2) {
                        return value[0] >= 0 && value[0] <= value[1];
                    }
                    return true; // Validation passes if chemistry marks are not provided
                },
                message: 'Invalid marks for chemistry. Marks obtained cannot be negative, and it should be less than or equal to total marks.'
            }
        },
        maths: {
            type: [Number, Number],
            validate: {
                validator: function (value) {
                    // Ensure marks obtained is not negative and less than or equal to total marks
                    return value[0] >= 0 && value[0] <= value[1];
                },
                message: 'Invalid marks for maths. Marks obtained cannot be negative, and it should be less than or equal to total marks.'
            }
        }
    }
});
module.exports=mongoose.model('Student',studentSchema);
