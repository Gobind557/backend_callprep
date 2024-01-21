const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const connectToMongo = require('./config/db.js');
connectToMongo();
app.use(bodyParser.json());


const calculatePercentage = require('./utils/calculatepercentage.js');
const calculateOverallPercentage = require('./utils/calculateoverallpercentage.js');
console.log(calculateOverallPercentage);
console.log(calculatePercentage);

app.use('', require('./routes/studentRoutes.js'));

const port = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});