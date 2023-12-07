const mongoose=require("mongoose");
const express=require("express");
const app=express();
const port=700;
const  dbconnect=require("./dbconnection");
const Rooms=require("./schema/rooms")
dbconnect();
app.use(express.json())
app.post("/admin/addroom",async(req,res)=>
{
    const data=req.body;
    console.log(data);
    const newroom=new Rooms(data);
    await newroom.save();
    //console.log(saveddata);
    res.send("room is added succesfully")
}
)
app.get("/user/emptyrooms",async (req,res)=>{
    try{
    const emptyrooms=await Rooms.find({isbooked:false});
    emptyrooms.forEach(element => {
        console.log(element);
        res.write(JSON.stringify(element))
        res.write('\n')
    });
    res.end();
}
    catch(err){
        console.log(err)
    }
})
app.get("/user/emptyrooms/:roomnumber",async (req,res)=>{
    try{
    const roomnumber=req.params.roomnumber;
    const userdata=req.body;
    const roomtobook=await Rooms.findOne({isbooked:false,roomno:roomnumber});
    if(!roomtobook){
        res.send("room not found or room is booked alredy")
    }
    else{
    roomtobook.isbooked=true,
    roomtobook.userinfo=userdata;
    roomtobook.duration=Math.floor((userdata.booking.checkoutdate-userdata.booking.checkindate)/(1000 * 60 * 60 * 24))
    console.log(typeof(roomtobook.duration));
    res.json(roomtobook);
    await roomtobook.save()
    console.log(roomtobook.duration);
    }
    }
    catch(err){
        console.log(err);
    }

})
app.put("/user/emptyrooms/cancel/:roomnumber",async(req,res)=>{
    try{
    const username=req.body;
    const cancelroomno=req.params.roomnumber;
    const cancelroom=await Rooms.find({isbooked:true,roomno:cancelroomno})
    console.log(cancelroom);
    if(!cancelroom.userinfo || username !== cancelroom.userinfo.name){
        res.status("you are not allowed to cancel the room")
    }
    else{
        cancelroom.isbooked=false;
        cancelroom.userinfo={};
        await cancelroom.save();
        res.status("succesfully cancled the room ")
    }
}
catch(err){
    console.log(err);
}
}
)
app.listen(port,(req,res)=>{
    console.log("successfully connected to server");
})
console.log("this a function of adding a room");