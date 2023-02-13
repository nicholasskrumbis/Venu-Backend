//import dotenv from "dotenv";

const app = require("./app");
const mongoose = require("mongoose");

//dotenv.config();

const PORT = 9000;

const dbURI =
  "mongodb+srv://skrumby:k7l0r3n225@cluster0.qqule.mongodb.net/venu?retryWrites=true&w=majority";

//Connect to MongoDB database
console.log("Attempting to connect to DB");
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));