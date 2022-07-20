const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://expenses:expenses@cluster0.pxgeucd.mongodb.net/expenses",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("open", () =>
  console.log("Mongodb connection sucessfully established.")
);
