const express=require("express")
const router=express.Router()
const protect=require("../middleware/middleWare")
const {getTypes,getTypeById}=require("../controller/typeTestController")

router.get("/type/all",protect,getTypes)
router.get("/type/specific/:id",protect,getTypeById)

module.exports=router