var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

router.use(bodyparser.urlencoded({ extended: true }));


var userSchema = new mongoose.Schema({
    Eth_address: {
        type: String,
        unique: true,
        required:true
    },
    id: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required:true
    }
})
var User = mongoose.model('User', userSchema);
exports.create = function (req, res) {

    User.create({
        Eth_address: req.body.Eth_Address,
        id: req.body.id,
        password: req.body.password
    },
    //중복 확인후 있으면 데이터 추가
    {upert : true},
        function (err, user) {
            if (err) return res.status(500).send("User 생성 실패");
            res.status(200).send(user);
            console.log("생성성공")

        })
}

