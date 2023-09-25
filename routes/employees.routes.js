const express = require("express")

const employeeRouter = express.Router()

const {EmployeeModel} = require("../models/employee.model")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")


employeeRouter.get("/",async(req,res)=>{
    let query = {}

    // if(req.query.department){
    //     query["department"]=req.query.department
    // }
    // else if(req.query.sort&&req.query.sort=="asc"){
    //    query = { ...{}, "sort":{"salary":1}}
    // }
    // else if(req.query.sort&&req.query.sort=="desc"){
    //     query = { ...{}, "sort":{"salary":1}}
        
    //  }
    //  else if(req.query.search){
    //     query["search"]=req.query.search
    //  }

    if (req.query.department) {
        query.department = req.query.department;
      }  else if (req.query.search) {
        // Handle search functionality (if needed)
        query.first_Name = { $regex: req.query.search, $options: "i" }
      }
       
      const sort = {};

    if (req.query.sort) {
      if (req.query.sort === "asc") {
        sort.salary = 1; // Sort by salary in ascending order
      } else if (req.query.sort === "desc") {
        sort.salary = -1; // Sort by salary in descending order
      }
    }

    

   try{
    const employees = await EmployeeModel.find(query).sort(sort);
    res.json(employees)
   }
   catch(err){
     res.json(err.message)
   }
})


employeeRouter.post("/",async(req,res)=>{
    const {first_Name,
        last_Name,
        email,
        department,
        salary} = req.body

        try{
        const employee = new EmployeeModel({first_Name,
            last_Name,
            email,
            department,
            salary})
            await employee.save()
            res.json("employee created")
        }
        catch(err){
         res.json(err.message)
        }
})

employeeRouter.delete("/:id",async(req,res)=>{
    const id = req.params.id
    try{
      await EmployeeModel.findByIdAndDelete({_id:id})
      res.json("employee deleted")
    }
    catch(err){
        res.json(err.message)
    }
})

employeeRouter.patch("/:id",async(req,res)=>{
    const id = req.params.id
    const payload = req.body
    try{
      await EmployeeModel.findByIdAndUpdate({_id:id},payload)
      res.json("employee deleted")
    }
    catch(err){
        res.json(err.message)
    }
})

module.exports = {employeeRouter}