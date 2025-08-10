const typingTestSchema = require("../model/typeMode");

const mongoose = require("mongoose");

const createTypingTest=async(req,res)=>{
    try{
        const {id,wpm,accuracy,difficulty}=req.body
        const userId=req.user.id
        const typingTest=await typingTestSchema.create({userId,wpm,accuracy,testId:id,difficulty})
        res.status(201).json({message:"Typing test created successfully",typingTest,success:true})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const fetchTypingTest = async (req, res) => {
  try {
    const uid = req.user.id;
    

    const typingTest = await typingTestSchema.find({ userId: uid });
    if(!typingTest) {
      return res.status(404).json({ message: "Typing test not found" });
    }
    res.status(200).json({
      message: "Typing test fetched successfully",
      typingTest,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports={createTypingTest,fetchTypingTest}