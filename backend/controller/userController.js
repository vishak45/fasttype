const User=require("../model/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        let userExist=await User.findOne({email});
        if(userExist)
        {
            return res.status(400).json({message:"User already exist"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const user=await User.create({name,email,password:hashedPassword})
        res.status(201).json({message:"User created successfully",success:true})
    }
    catch(error){
        console.log("error is",error)
        res.status(500).json({message:"Internal server error"})
    }
}

const loginUser=async(req,res)=>{
  try{
    const {email,password}=req.body
    let userExist=await User.findOne({email})
    if(!userExist)
    {
        return res.status(400).json({message:"User does not exist"})
    }
    let passwordMatch=await bcrypt.compare(password,userExist.password)
    if(!passwordMatch)
    {
        return res.status(400).json({message:"Password does not match"})
    }
    const token=jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.status(200).json({message:"Login successful",userExist,token,success:true})
    
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:"Internal server error"})
  }
}

module.exports={
    registerUser,
    loginUser
}
