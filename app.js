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
app.put("/user/emptyrooms/:roomnumber",async (req,res)=>{
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
    const checkinDate = new Date(userdata.booking.checkindate);
    const checkoutDate = new Date(userdata.booking.checkoutdate);
    roomtobook.userinfo.booking.duration = Math.floor((checkoutDate-checkinDate)/(1000 * 60 * 60 * 24))
    console.log(typeof(roomtobook.duration));
    console.log(roomtobook.duration);
    const roomprice=roomtobook.price;
    roomtobook.userinfo.booking.totalamount=roomtobook.userinfo.booking.duration*roomprice;
    console.log(roomtobook.totalamount);
    res.json(roomtobook);
    await roomtobook.save();
    console.log(duration);
    }
    }
    catch(err){
        console.log(err);
    }

})


app.put("/user/emptyrooms/cancel/:roomnumber",async(req,res)=>{
    try{
    const {username}=req.body;
    console.log(username);
    const cancelroomno=req.params.roomnumber;
    const cancelroom=await Rooms.findOne({roomno:cancelroomno})
    console.log(cancelroom);
    //console.log(cancelroom);
    console.log(cancelroom.userinfo.name);
    if(username !== cancelroom.userinfo.name){
        res.send("you are not allowed to cancel the room")
    }
    else{
        cancelroom.isbooked=false;
        cancelroom.userinfo={};
        await cancelroom.save();
        res.send("succesfully cancled the room ")
        console.log(cancelroom);
    }
}
catch(err){
    console.log(err);
    res.status(500).send("internal server error")
}
}
)


app.listen(port,(req,res)=>{
    console.log("successfully connected to server");
})
console.log("this a function of adding a room");