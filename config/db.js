
const mongoose = require('mongoose');

const mongoURI =
  "mongodb+srv://ggobindbe20:MRGOHAL@cluster0.1asfyuk.mongodb.net/";



const connectToMongo=()=>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
}
module.exports=connectToMongo;
