const jwt=require("jsonwebtoken")

const protect=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    }
    catch(error){
        res.status(401).json({message:"Unauthorized"});
    }
}

module.exports=protect