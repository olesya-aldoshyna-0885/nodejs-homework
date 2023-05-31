const mongoose = require("mongoose");

const app = require("./app");

mongoose.set("strictQuery", true);

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
      app.listen(PORT);
      console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });