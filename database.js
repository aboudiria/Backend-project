const mongoose = require("mongoose");
require("dotenv").config();

exports.connect_db = async () => {
    try{
          await mongoose.connect(process.env.mongodb_uri);
          console.log("mongodb connected");

    }catch(err){
        console.error(err);
        process.exit(1);

    }
}
