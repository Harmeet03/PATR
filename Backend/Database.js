const mongoose = require('mongoose');

const database = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Database Connected");
    }
    catch(error){
        console.log("Database Connection Not Found. ", error);
    }
}

module.exports = database;