const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const {User} = require('./models/User');
const {auth} = require('./middleware/auth')

app.use(bodyParser.urlencoded({urlencoded: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongo_URI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(()=>console.log('MongoDB connected..'))
.catch(err=>console.log(err))

app.get('/', (req, res)=>{
    res.send('hello 헤링이야')
})

app.get('/api/hello',(req,res)=>{
    res.send("안녕하세요 ~")
})

app.post('/api/users/register',(req,res)=>{
    // client에서 보내는 회원가입 정보들을 받아와서 데이터베이스에 저장
    const user = new User(req.body)

    user.save((err, userInfo)=>{
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success:true
        })
    })
})

app.post('/api/users/login', (req, res)=>{
    // 요청된 이메일을 데이터베이스에 있는지 찾음
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSucess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다"
            })
        }
        // 이메일과 비밀번호가 일치하는지 찾음
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
                return res.json({loginSucess: false, message: "비밀번호가 틀렸습니다"})

            // 비밀번호가 같다면 토큰 생성
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                // 토큰을 저장한다. -> cookie
                // console.log("성공")
                res.cookie("x_auth",user.token )
                .status(200)
                .json({loginSuccess:true, userId: user._id})
            })
        })
    })
})

app.get('/api/users/auth', auth , (req,res)=>{
    // auth이 true면 미들웨어가 여기까지 통과 가능
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout',auth,(req, res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""},
         (err, user)=>{
            if(err) return res.json({success:false, err})
            return res.status(200).send({
                success:true
            })
        })
})

const port = 5000
app.listen(port, () => console.log(`example ${port}`))