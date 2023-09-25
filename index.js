const express = require("express")

const {connection} = require("./db")

const {userRouter} = require("./routes/user.routes")

const {employeeRouter} = require("./routes/employees.routes")

var cors = require('cors')

const app = express()

app.use(express.json())

app.options('*', cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/user", userRouter)

app.use("/employee",employeeRouter)

app.listen(8080,async()=>{
    try{
await connection
console.log("server is connected to db")
    }
    catch(err){
  xonsole.log(err.message)
    }
console.log("server is running at port 8080")
})