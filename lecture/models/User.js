const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique:1
    },
    password:{
        type: String, minlength: 4
    },
    lastname: {
        type: String, maxlength: 50
    },
    role: {
        type: Number, default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 유저 정보를 저장하기 전에 할 일
userSchema.pre('save', function(next){
    var user = this;

    if (user.isModified('password')){
        // 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
   
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword와 암호화된 cb가 맞는지 체크 (cb를 복호화하는 건 불가능해)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    console.log('user._id', user._id)
    // jsonwebtoken을 이용해서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
            cb(null, user)
    })
}

const User = mongoose.model ('User', userSchema)
module.exports = {User}