const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBHOST}/${process.env.MONGODBDATABASE}`,
    {
      authMechanism: "DEFAULT",
      authSource: "admin",
    }
  );
}

module.exports = connectToDatabase;
