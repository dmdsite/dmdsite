var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var crypto=require('crypto');
// var alert=require('node-popup')
var alert = require('alert-node')




router.use(bodyparser.urlencoded({ extended: true }));


var userSchema = new mongoose.Schema({
    Eth_Address: {
        type: String,
        unique: true,
        required: true
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt:{
        type:String
    }
})
var User = mongoose.model('User', userSchema);
exports.create = function (req, res) {

    User.find({ 'id': req.body.id }, function (err, data) {
        //중복 확인후 없으면 데이터 추가
        if (err) console.log(err)
        else {
            //비밀번호 암호화
            let salt=Math.round((new Date().valueOf()*Math.random()))+"";
            let hashPassword=crypto.createHash("sha512").update(req.body.password+salt).digest('hex');
            if (data == "") {
                User.create({
                    Eth_Address: req.body.Eth_Address,
                    id: req.body.id,
                    password: hashPassword,
                    salt:salt
                }, function (err, user) {
                    if (err) {
                        return res.status(500).send("User 생성 실패");
                    }
                    res.status(200).send(user);
                    alert("회원가입 완료")
                    console.log("생성성공")

                })
            }
            else {
                res.redirect("http://naver.com");
                alert("이미 등록된 id입니다")

            }
        }
    })
}

