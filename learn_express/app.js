const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next)=>{
    console.log('모든 요청이 다 실행');
    next();
});

app.get('/', (req, res, next)=>{
    //res.send('Hello express');
    console.log('GET 요청시에만 실행');
   
    res.sendFile(path.join(__dirname, '/index.html'))
    next();
},(req, res)=>{
    throw new Error('에러는 에러처리 미들웨어로 갑니다');
});

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
})