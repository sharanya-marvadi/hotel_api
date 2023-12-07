const mongoose=require("mongoose");
const dotenv=require("dotenv").config();
//const Rooms=require('./schema/rooms');
const dbconnect=async ()=>{
    try{
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("succesfully connected to database");
}
catch(err){
    console.log(err);
}}
module.exports=dbconnect;
