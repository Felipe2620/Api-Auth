exports.success = (req, res, message="",statusCode=200)=>{
    res.status(statusCode).json({
        ok:true,
        status:statusCode,
        body:message,
    });
};

exports.error = (req, res, message="Error Interno",statusCode=500)=>{
    res.status(statusCode).json({
        ok:true,
        status:statusCode,
        body:message,
    });
};