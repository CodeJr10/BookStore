import { Book } from "../models/bookModel.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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

router.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear, sales } = req.body;

    if (!title || !author || !publishYear || !sales) {
      return res
        .status(500)
        .send("Enter title,author,publishYear,sales correctly");
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send("Book not found");
    } else {
      return res.status(200).send("Book Updated Successfully!");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Unable to update book");
  }
});

// Route Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json("Book not found");
    } else {
      return res.status(200).send("Book deleted successfully");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Book not deleted");
  }
});

export default router;
