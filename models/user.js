var mongoose = require('mongoose');
var passportLocalMongoose =require("passport-local-mongoose");
const userSchema =new mongoose.Schema({
  username:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
    //   required:true
  },
  phoneno:{
      type:String,
      requied:true
  },
  aadharno:{
      type:String,
      requied:true
  }
});
userSchema.plugin(passportLocalMongoose);
var projects = mongoose.model('user',userSchema);
module.exports =projects;