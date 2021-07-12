var express = require('express')
var app = express();
var bodyparser = require('body-parser')

var path = require('path')
var static = require('serve-static')

var http = require('http')
var server = http.createServer(app)

app.set('port', process.env.PORT || 4000);

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(static(path.join(__dirname,'public')))

app.use((req,res,next)=>{
    var paramID = req.body.name || req.query.name
    var paramMEMO = req.body.memo || req.query.memo
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
    res.write('<h1>서버의 응답결과</h1>')
    res.write('<div><p>'+paramID+'</p></div>')
    res.write('<div><p>'+paramMEMO+'</p></div>')
    res.write("<br><a href='/save.html'>기존 페이지로 돌아가기</a>")
    res.end()
})

server.listen(app.get('port'), () => {
    console.log('익스프레스 서버: '+ app.get('port'))
})