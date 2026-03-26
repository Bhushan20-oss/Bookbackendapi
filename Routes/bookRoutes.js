const express= require('express');
const {createbook,getallbooks,getbookbyid,updateBook,deletebook}= require('../controllers/bookController');
const {protect}= require('../middleware/authMiddleware');

const router = express.Router();

router.route("/")
  .get(getallbooks)
  .post(protect, createbook);


  router.route("/:id")
  .get(getbookbyid)
  .put(protect, updateBook)
  .delete(protect, deletebook);

module.exports = router;