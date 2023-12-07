const mongoose=require("mongoose");
const {Schema}=mongoose;
const user=new Schema({
    name:String,
    gender:String,
    booking:{
        checkindate:Date,
        checkoutdate:Date,
        duration:Number,
        totalamount:Number
    }
})
const roomschema=new Schema({
    roomno:{
        type:Number,
        require:true,
        unique:true
    },
    roomtype:String,
    price:Number,
    isbooked:Boolean,
    userinfo:user
})

module.exports=mongoose.model('allrooms',roomschema)






// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const user = new Schema({
//     name: String,
//     gender: String,
//     booking: {
//         checkInDate: Date,
//         checkOutDate: Date,
//     },
// });

// user.virtual('booking.duration').get(function () {
//     if (this.booking.checkInDate && this.booking.checkOutDate) {
//         const diffTime = Math.abs(this.booking.checkOutDate - this.booking.checkInDate);
//         return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // duration in days
//     }
//     return null;
// });

// const roomschema = new Schema({
//     roomno: {
//         type: Number,
//         require: true,
//         unique: true,
//     },
//     roomtype: String,
//     price: Number,
//     isbooked: Boolean,
//     userinfo: user,
// });

// // Add a method to calculate total amount
// roomschema.methods.calculateTotalAmount = function () {
//     if (!this.userinfo.booking || !this.userinfo.booking.duration) {
//         throw new Error("Invalid booking information");
//     }

//     return this.price * this.userinfo.booking.duration;
// };

// module.exports = mongoose.model('allrooms', roomschema);

