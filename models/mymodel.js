var mongoose=require('mongoose');
//let mongooseHidden = require('mongoose-hidden')();
let visibility = require('mongoose-visibility');
var jwt=require('jsonwebtoken');
//var token=require('../controllers/logincontroller');

var myschema = new mongoose.Schema({
    email:{type:String},
    name: {type:String},
    age:{type:Number},
    acess:{type:Boolean}
});

var mydata = mongoose.model("mySchema",myschema),self;

var visible=function(){
    let see=myschema.plugin(visibility, {
        hidden: ['__v', 'acess', ]
    })
    return see
}
class model{
    constructor(){
        self=this;
        self.type=myschema;
        self.mydata = mydata;
        self.vision=visible;
    }
}


const duplicate=function(a){
var k,hell;
    self.mydata.find({},(req,res)=>{
        let joker=[];
        res.filter(function(val){
            joker.push(val.name.indexOf(a)===-1);
            return joker;
        });
        hell=joker;
        return hell;
    });
return new Promise(function(res,rej){
        setTimeout(function(){k=hell.some(function(val){
            return val===false
        });
            res(k)
        },1000);
    })
};

model.prototype.find=function(req,call){

    self.mydata.find({},(err,data)=>{
        call(null,data)
    });
};

model.prototype.findOne=function(id,call){
    self.mydata.findOne({_id:id},(err,data)=>{
        if(err){
            call(err,null);
        }else{
            call(null,data);
            }
        })
};

model.prototype.create=function(req,call) {
    if(req.email&&req.name&&req.age&&typeof req.acess=="boolean"){
    req={email:req.email,name:req.name.trim(), age:parseInt(req.age),acess:req.acess};
    if(req.name===undefined){
        call("someting went wrong")
    }else {
        duplicate(req.name).then(function(val){
        if(val===true){
            call({status:401,message:"it is already exists"})
        }else{
            self.mydata.create(req, (err, data3) => {
                if (err) {
                    call(err, null)
                } else {
                    call(null, data3)
                }
            })
        }
    })
        }
    }else{
        call("give requierd fileds")
    }
    };

model.prototype.updateOne=function(id,body,call){
    self.mydata.updateOne({_id:id},body,(err,data)=>{
        if(err){
            call({status:400,err:"something went wrong"})
        }
        call(null,data)
    })
};

model.prototype.remove=function(id,call){
    self.mydata.remove({_id:id},(err,data)=>{
        call(null,data)
    })
};
model.prototype.updateMany=function(id,body,call){
    self.mydata.updateMany({id:_id},body,(err,data)=>{
        if(err){
            call({status:400,err:"something went wrong"})
        }
        call(null,data)
    })
};
module.exports=model;