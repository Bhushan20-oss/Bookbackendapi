const express = require("express");
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db')

dotenv.config();
connectDB();

app.use(express.json());




//imports 
const userRoutes= require('./Routes/userRoutes');
app.get('/', (req, res)=>{
    res.send('backend running')
});
//Routes
app.use('/api/users', userRoutes)

// port
const PORT =process .env.PORT;



app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
});

