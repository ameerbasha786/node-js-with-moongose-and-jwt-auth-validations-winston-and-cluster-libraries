var express=require('express');

module.exports=express().use('/',require('./myrouter')).use('/login',require('./loginrouter'))







