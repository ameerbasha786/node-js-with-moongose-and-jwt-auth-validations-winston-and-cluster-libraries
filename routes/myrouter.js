var express=require('express');
var Controllers=require('../controllers/mycontroller.js');
var Mc=new Controllers();
module.exports=express.Router().get('/', Mc.getAll.bind(Mc)).get('/:id',Mc.getById.bind(Mc)).post('/',Mc.create.bind(Mc)).put('/:id',Mc.updateOne.bind(Mc)).delete('/:id',Mc.remove.bind(Mc)).put('/:id',Mc.updateMany.bind(Mc));