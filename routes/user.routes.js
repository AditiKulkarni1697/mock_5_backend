const express = require("express")

const userRouter = express.Router()

const {UserModel} = require("../models/user.models")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

userRouter.get("/",async(req,res)=>{
    try{
    const users = await UserModel.find()
    res.json({msg:"users", users: users})
    }
    catch(err){
     res.json(err.message)
    }
})


userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
  bcrypt.hash(password,8,(async(err,hash)=>{
    if(hash){
    try{
        
        const user = new UserModel({email,password:hash})

        await user.save()
        res.json("user registered")
      }
      catch(err){
       res.json(err.message)
      }
    }
    else{
        res.json(err.message)
    }
  }))

   
})

userRouter.post("/login",async(req,res)=>{
   const {email,password}=req.body

   const user = await UserModel.findOne({email:email})
   
   bcrypt.compare(password, user.password, (err,result)=>{
    if(result){
         const token = jwt.sign({userId:user._id},"token")
         res.json({
            msg:"logged in",
            token: token
         })
    }
    else{
        res.json(err.message)
    }
   })
})

userRouter.get("/logout",async(req,res)=>{
    res.json("User logged out")
})
module.exports = {userRouter}