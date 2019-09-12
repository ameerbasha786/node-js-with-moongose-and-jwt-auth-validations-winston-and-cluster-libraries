var express=require('express');
var LoginControllers=require('../controllers/logincontroller.js');
var lc=new LoginControllers();
module.exports=express.Router().post('/',lc.auth.bind(lc));