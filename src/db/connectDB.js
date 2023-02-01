const mongoose = require("mongoose");
const DATABASE_URL = 'mongodb://SaadMalik:saad03212710920@ac-yvtqk1o-shard-00-00.124ticf.mongodb.net:27017,ac-yvtqk1o-shard-00-01.124ticf.mongodb.net:27017,ac-yvtqk1o-shard-00-02.124ticf.mongodb.net:27017/fyp-backend?ssl=true&replicaSet=atlas-1kcbyc-shard-0&authSource=admin&retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("DataBase Successfully connected...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
