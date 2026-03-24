const express= require('express');
const router = express.Router();
const book = require('../models/Books');
const {protect} = require("../middleware/authMiddleware");
const Books = require('../models/Books');
const req = require('express/lib/request');



router.post('/', protect, async(req,res)=>{
    const {title, author, genre, price, instock} =req.body;

    try {
        const book = await Books.create({
            title,
            author,
            genre,
            price,
            instock,
            user:req.user._id,
        });

        res.status(201).json({
            message:"Book created Successfully",
            book,
        });
    } catch (error) {
        res.status(500).json({
            message:'error creating book',
            error:error.message,
        });
    }
});

router.get('/', async(req, res)=>{
    try{
        const books =await Books.find().populate("user", "name email");;

        res.json({
            count:book.length,
            books,
        });
    }catch(error){
        res.status(500).json({
            message:'Error fetching books',
            error:error.message,
        });
    }
});


//get book by id 

router.get('/:id', async(req, res)=>{
    try {
        const book = await Books.findById(req.params.id).populate("user", "name email");;

        if(!book){
            return res.status(404).json({
                message:'book not found',
            });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({
            message:'Error fetching ',
            error:error.message,
        });
    }
});

module.exports = router;