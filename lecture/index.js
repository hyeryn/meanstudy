const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');

const config = require('./config/key');
const {User} = require('./models/User');

app.use(bodyParser.urlencoded({urlencoded: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongo_URI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(()=>console.log('MongoDB connected..'))
.catch(err=>console.log(err))

app.get('/', (req, res)=>{
    res.send('hello 헤링이야')
})

app.post('/register',(req,res)=>{
    // client에서 보내는 회원가입 정보들을 받아와서 데이터베이스에 저장
    const user = new User(req.body)

    user.save((err, userInfo)=>{
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success:true
        })
    })
})
app.listen(port, () => console.log(`example ${port}`))