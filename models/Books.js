const mongoose = require('mongoose');

const bookschema =mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        genre:String,
        price:Number,
        isStock:Boolean,

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Book', bookschema);