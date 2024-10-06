import { mongoDBURL, port } from "./config.js";

import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoute.js";
import express from "express"; // imports express to your file, ,loads the express module to use its functionality (doesn't actually create the app, just imports the necessities)
import mongoose from "mongoose";

const app = express(); // creates an object to represent the express modules to use it.
app.use(express.json()); // middleware for json parser (req body)

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/books", booksRoute);

//route to add book

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to db");
    app.listen(port, () => {
      // creates and starts a server, here the port argument tells us which port the server is listening to
      console.log(`App is listening to ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
