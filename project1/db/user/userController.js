var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');





router.use(bodyparser.urlencoded({ extended: true }));


var userSchema = new mongoose.Schema({
    Eth_Address: {
        type: String,
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
    salt: {
        type: String
    }
})
var User = mongoose.model('User', userSchema);
exports.create = function (req, res) {
    User.find({ 'id': req.body.id }, function (err, data) {
        //중복 확인후 없으면 데이터 추가
        if (err) console.log(err)
        else {
            //비밀번호 암호화
            console.log(req.body.password)
            let salt = Math.round((new Date().valueOf() * Math.random())) + "";
            let hashPassword = crypto.createHash("sha512").update(req.body.password + salt).digest('hex');
            if (data == "") {
                User.create({
                    Eth_Address: req.body.Eth_Address,
                    id: req.body.id,
                    password: hashPassword,
                    salt: salt
                }, function (err, user) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(user);
                    console.log("생성성공")
                    res.send({ check: true });

                })
            }
            else {
                res.send({ check: false });
            }
        }
    })

};

exports.sign_in = function (req, res) {
    User.findOne({
        'id': req.body.id,
    }, function (err, data) {
        if(err) {
            res.send({check:false})
        }
        if (data == null) {
            res.send({ check: false })
        }
        else {
            console.log(data);
            let hashPassword = crypto.createHash("sha512").update(req.body.password + data.salt+"").digest('hex');
            if (data.password == hashPassword) {
                res.send({ check: true })
                console.log(data.salt);
                console.log(req.body.id + '로그인 성공');
            }
            else
                res.send({check:false});

        }
    })
    // passport.authenticate('local');
    // // serializeUser,deserializeUser 두 함수가 꼭 필요

    // //로그인 성공시 실행되는 done에서 user객체를 전달받아 세션(req.session.passport.user)에 저장
    // passport.serializeUser((user,done) => {
    //     done(null,user);    //user가 deserializeUser의 첫 번째 매개변수로이동
    // })

    // //실제 서버로 들어오는 요청마다 세션정보를 실제 db데이터와 저장
    // passport.deserializeUser((user,done) =>{
    //     done(null,user);   //user가 req.user됨
    // })

    // console.log(req.body.id);
    // passport.use('local',new LocalStrategy(
    // function(id,password,done){
    //     console.log(id);
    //     console.log(password);
    //     console.log(done);

    // }
    // ))
};
    // (id,password,done) => {
    //     console.log(1211355);
    //     User.findOne({id:id}, (findError,user) =>{
    //         if(findError) return done(findError) //서버 에러 처리
    //         if(!user) return done(null,false,{message : '존재하지 않는 아이디입니다'});
    //         return comparePassword(password,(pasError,isMatch) =>{
    //             if(isMatch){

    //                 return done(null,user);
    //             }
    //             return done(null,false,{message : '비밀번호가 틀렸습니다'});
    //         })
    //     })
    // }

//     ))
// }

