var loginmodel=require('../models/token');
var Lm=new loginmodel();
// var myschema=require('../models/mymodel');
// var validata=new myschema();
class LoginControllers{
    constructor(){

    }
}

LoginControllers.prototype.auth=function(req,res){
   //console.log(req.body);
    Lm.auth(req.body,function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
};

module.exports=LoginControllers;