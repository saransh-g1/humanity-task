const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://saranshkeshari9:Sara2711@cluster0.d0byvbu.mongodb.net/humanity?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Failed to Connect MongoDb");
});

db.once("open", () => {
  console.log("Connected To MongoDB");
});