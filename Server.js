const express = require("express");
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const {errorHandler}= require('./middleware/errorMiddleware');
const rateLimit = require('express-rate-limit');

dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Missing ENV variables");
  process.exit(1);
}

connectDB();
console.log("connected to db");

const app = express();
app.use(express.json());

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:{
        success:false,
        message:"Too many requests, try after some time",
    },
});

app.use(limiter);

app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/books', require('./Routes/bookRoutes'));

app.use(errorHandler);

// port
const PORT =process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
});

