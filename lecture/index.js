const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyeryn2000:hyeryn2000@cluster0.z46kv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(()=>console.log('MongoDB connected..'))
.catch(err=>console.log(err))

app.get('/', (req, res)=>{
    res.send('hello')
})
app.listen(port, () => console.log("example "+port))