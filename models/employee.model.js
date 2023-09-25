const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
first_Name: String,
last_Name: String,
email: String,
department:  String,
salary: Number
})

const EmployeeModel = mongoose.model("employee", employeeSchema)

module.exports = {EmployeeModel}