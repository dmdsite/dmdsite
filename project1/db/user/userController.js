var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
// import alert from 'alert-node'
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
    }
})
var User = mongoose.model('User', userSchema);
exports.create = function (req, res) {

    User.find({ 'id': req.body.id }, function (err, data) {
        if (err) console.log(err)
        else {
            //중복 확인후 있으면 데이터 추가
            if (data == "") {
                User.create({
                    Eth_Address: req.body.Eth_Address,
                    id: req.body.id,
                    password: req.body.password
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
                
                alert("이미 등록된 id입니다")

            }
        }
    })
}

