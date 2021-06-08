const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const router = require('./routes/index.js');
require('./db/mongoose')
require('dotenv').config()

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public')) //for resources + css files
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use('/',router);

const PORT=process.env.PORT||3000;
app.listen(PORT,(req,res)=>{
    console.log(`Server is listening on ${PORT}`);
});