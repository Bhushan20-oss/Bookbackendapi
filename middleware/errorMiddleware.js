const errorHandler =(err, req, res, next)=>{
    console.error(err);

    res.status(res.statuscode||500).json({
        success:false,
        message:err.message||"Internal Server Error",
    });
};


module.exports ={errorHandler};