const jwt=require('jsonwebtoken');
var schema=require('../models/mymodel');
var Newschema=new schema();
//console.log(Newschema.mydata.find({}))
class loginmodel{
    constructor(){

    }
};
loginmodel.prototype.auth=function(body,call) {
    if (Object.keys(body).length < 5){
        if (body.email && body.name && body.age && typeof body.acess == "boolean") {
            Newschema.mydata.find({"name":body.name},(err,data)=>{
                if(err){
                    call(err);
                }else{
                    if(data.length==0||data==null||data==undefined){
                        call("your not allowed acess records")
                    }else{
                        var secure=(jwt.sign({
                            email: body.email,
                            name: body.name,
                            age: body.age,
                            acess: body.acess
                        }, 'secret', {expiresIn: 60 * 60}));
                        call({id:data[0]._id,token:secure,date:new Date().toDateString()})
                    }
                }
            })

        } else {
            call("give proper credintials")
        }
    }else{
        call("give only required fields for token")
    }
}

module.exports=loginmodel;
