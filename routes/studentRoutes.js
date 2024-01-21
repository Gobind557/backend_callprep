
const Student = require('../model/studentModel.js');
const Student2 = require('../model/studentModel2.js');
const connectToMongo = require('../config/db.js');
connectToMongo();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


const calculatePercentage = require('../utils/calculatepercentage.js');
const calculateOverallPercentage = require('../utils/calculateoverallpercentage.js');
console.log(calculateOverallPercentage);
console.log(calculatePercentage);


const router = require('express').Router();
router.post('/addStudent', async (req, res) => {
    try {
        const { name, age, gender, marks,rollno } = req.body;

        // Validate the required fields
        if (!name || !age || !gender || !marks || !rollno) {
            return res.status(400).json({ error: 'Incomplete data. Please provide all required fields.' });
        }

        // Create a new student instance
        const newStudent = new Student({
            name,
            rollno,
            age,
            gender,
            marks
        });

        // Save the student to the database
        await newStudent.save();

        res.status(201).json({ message: 'Student added successfully.' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint to handle POST requests for student2 records
router.post('/addStudent2', async (req, res) => {
    try {
        const { first_name, rollno, last_name, years_old, scores } = req.body;

        // Validate the required fields
        if (!first_name || !rollno || !last_name || !years_old || !scores || !scores.subjects || !scores.marks_obtained || !scores.total_marks) {
            return res.status(400).json({ error: 'Incomplete data. Please provide all required fields.' });
        }

        // Create a new student instance
        const newStudent2 = new Student2({
            first_name,
            rollno,
            last_name,
            years_old,
            scores
        });

        // Save the new student to the database
        await newStudent2.save();

        res.status(201).json({ message: 'Student added successfully.' });
    } catch (error) {
        console.error('Error processing request:', error);
        if (error.name === 'ValidationError') {
            // Custom validation error message
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to handle GET requests for all student records with percentages
router.get('/getAllStudents', async (req, res) => {
    try {
        // Retrieve all student records from the database
        const students = await Student.find();
        const students2=await Student2.find();

        // Calculate percentages and format the response
        const formattedStudents = students.map(student => ({
            name: student.name,
            age: student.age,
            gender: student.gender,
            physics_percentage: calculatePercentage(student.marks.physics),
            chemistry_percentage: calculatePercentage(student.marks.chemistry),
            maths_percentage: calculatePercentage(student.marks.maths),
            overall_percentage: calculateOverallPercentage(student.marks)
        }));
        const formattedStudents2 = students2.map(student2 => {
            const physicsPercentage = (student2.scores.marks_obtained[student2.scores.subjects.indexOf('physics')] / student2.scores.total_marks[student2.scores.subjects.indexOf('physics')]) * 100;
            const chemistryPercentage = (student2.scores.marks_obtained[student2.scores.subjects.indexOf('chemistry')] / student2.scores.total_marks[student2.scores.subjects.indexOf('chemistry')]) * 100;
            const mathsPercentage = (student2.scores.marks_obtained[student2.scores.subjects.indexOf('maths')] / student2.scores.total_marks[student2.scores.subjects.indexOf('maths')]) * 100;
            const overallPercentage = ((physicsPercentage + chemistryPercentage + mathsPercentage) / 3).toFixed(2);

            return {
                name: `${student2.first_name} ${student2.last_name}`,
                age: student2.years_old,
                gender: '', // Gender information not provided in the given data
                physics_percentage: physicsPercentage.toFixed(2),
                chemistry_percentage: chemistryPercentage.toFixed(2),
                maths_percentage: mathsPercentage.toFixed(2),
                overall_percentage: overallPercentage
            };
        });


        res.status(200).json(formattedStudents.concat(formattedStudents2));
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;