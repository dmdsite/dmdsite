var mongoose=require('mongoose');
var UserSchema=new mongoose.Schema({
    id : String,
    password : String,
    public_key : String
});

mongoose.model('user',UserSchema);

module.exports=mongoose.model('user');