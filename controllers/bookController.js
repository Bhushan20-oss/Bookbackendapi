const Book = require("../models/Books");

//create an new book
const createbook = async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    res.status(400);
    throw new Error("Title and author required");
  }

    const existingBook = await Book.findOne({
    title,
    author,
    user: req.user._id 
  });

  if (existingBook) {
    res.status(400);
    throw new Error("Book already exists");
  }
  
  const book = await Book.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Book created Successfully",
    data: book,
  });
};

// get all the books

const getallbooks = async (req, res) => {
  const books = await Book.find().populate("user","email");

  res.json({
    success: true,
    count: books.length,
    data: books,
  });
};

// get book by its id

const getbookbyid = async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!book) {
    res.status(404);
    throw new Error("Book not Found");
  }
  res.json({
    success: true,
    data: book,
  });
};

// update the book

const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (book.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });

  res.json({
    success: true,
    message: "Book updated",
    data: updatedBook,
  });
};


// DELETE the Book

const deletebook= async(req, res)=>{

        const book = await Book.findById(req.params.id);

        if(!book){
            res.status(404);
            throw new Error("book not found");
        }

        if(book.user.toString()!== req.user._id.toString()){
            res.status(401);
            throw new Error ("Not Authorised to delete this book");

        }

        await book.deleteOne();

        res.json({
            success: true,
            message:"Book deleted",
        });
};


module.exports ={
    createbook,
    getallbooks,
    getbookbyid,
    updateBook,
    deletebook,
};