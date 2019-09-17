var express=require('express');
var router=express.Router();
var bodyparser=require('body-parser');

router.use(bodyparser.urlencoded({extended:true}));


var userSchema = new mongoose.Schema({
    Eth_address: {
        type: String,
        unique: true,
        index: true
    },
    id: {
        type: String,
        unique: true,
        index: true
    },
    password: {
        type: String
    }
})
var User = mongoose.model('User', userSchema);

exports.add=function(req,res){
    User.create({
        Eth_address:req.body.Eth_address,
        id:req.body.Id,
        password:req.body.password
    },
    function(err,user){
        if(err) return res.status(500).send("User 생성 실패");
        res.status(200).send(user);
    })
}