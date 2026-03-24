const express = require("express");
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db')



dotenv.config();
connectDB();

app.use(express.json());

const {protect}= require('./middleware/authMiddleware');

//imports routes 
const userRoutes= require('./Routes/userRoutes');
const bookRoutes = require('./Routes/bookRoutes');

app.get('/api/test', protect,(req, res)=>{
    res.json({
        message:"Protected route accessed",
        user:req.user,
    });
});

app.get('/', (req, res)=>{
    res.send('backend running')
});
//Routes
app.use('/api/users', userRoutes)
app.use("/api/books", bookRoutes);

// port
const PORT =process .env.PORT;



app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
});

