import { mongoDBURL, port } from "./config.js";

import { Book } from "./models/bookModel.js";
import express from "express"; // imports express to your file, ,loads the express module to use its functionality (doesn't actually create the app, just imports the necessities)
import mongoose from "mongoose";

const app = express(); // creates an object to represent the express modules to use it.

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json()); // json parser

//route to add book
app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear, sales } = req.body;
    if (!title || !author || !publishYear || !sales) {
      return res.status(400).send({
        message: "Enter all required fields: title, author, publishYear,sales",
      });
    }
    const newBook = {
      title,
      author,
      publishYear,
      sales,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all books or get by title
app.get("/books", async (req, res) => {
  try {
    const { title } = req.query;

    if (title) {
      // checks for title parameter in the query
      const book = await Book.findOne({ title });

      if (!book) {
        return res.status(404).json({ message: "No books found" });
      }
      return res.status(200).json(book);
    }
    // if title parameter is not there it executes the else part to get all books in db
    else {
      const books = await Book.find({});
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get book by Id

app.get("/books/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

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
