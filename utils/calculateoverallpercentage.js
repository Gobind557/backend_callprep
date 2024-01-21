const calculatePercentage = require('./calculatepercentage');
function calculateOverallPercentage  (marks) {
    const percentages = Object.values(marks).map(calculatePercentage).filter(percent => percent !== null);
    if (percentages.length === 0) {
        return null; // Handle no valid percentages
    }
    return percentages.reduce((sum, percentage) => sum + percentage, 0) / percentages.length;
};
module.exports = calculateOverallPercentage;