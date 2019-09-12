var model =require ('../models/mymodel.js');
const jwt=require('jsonwebtoken');
const mm=new model();
class Controllers{
constructor(){

}
}

Controllers.prototype.getAll=function(req,res){
    var myres;
    var token3=req.headers['x-access-token'];
    if(token3){
    jwt.verify(token3,"secret",function(err,data){
        if (err) {
            res.status(400).json(err)
        } else {
            mm.find(req, (err, data1) => {

            if (data.acess === false) {
                mm.vision();

                res.status(200).send(data1)

            } else {
                mm.vision().visibility.hidden=false;

                res.status(200).send(data1)

            }
        })
        }
    });
    }else{
        res.send({status:400,err:'authentication needed'})
    }
};

Controllers.prototype.getById=function(req,res) {
    var token2 = req.headers['x-access-token'];
    jwt.verify(token2, "secret", function (err) {
        if (err) {
            res.status(400).json(err)
        }else{
            mm.findOne(req.params.id, (err, data) => {
                if (data === undefined || data === null || data.length == 0 || !data.id) {
                    res.status(404).send(`id:${req.params.id} is not found in records`)
                } else {
                    if (req.params.id === data.id)
                        res.status(200).send(data)
                }
            });
        }
        });
};

Controllers.prototype.create=function(req,res) {
    var token1 = req.headers['x-access-token'];
    if (token1) {
        jwt.verify(token1, "secret", function (err) {
            if (err) {
                res.status(400).json(err)
            } else {
                mm.create(req.body, (err1, data1) => {
                    if (err1) {
                        res.send(err1);
                    } else {
                        res.status(200).send(data1)
                    }
                });
            }
        })
    } else {
        res.send({status: 400, err: 'authentication needed'})
    }
};

Controllers.prototype.updateOne=function(req,res){
    var token4=req.headers['x-access-token'];
    jwt.verify(token4,"secret",function(err) {
        if (err) {
            res.status(400).json(err)
        } else {
            mm.updateOne(req.params.id, req.body, (err, data) => {
                res.status(200).send(data)
            });
        }
    })
};

Controllers.prototype.remove=function(req,res) {
    var token5 = req.headers['x-access-token'];
    jwt.verify(token5, "secret", function (err) {
        if (err) {
            res.status(400).json(err)
        } else {
            mm.remove(req.params.id, (err, data) => {
                res.send(data)
            });
        }
    })
};
Controllers.prototype.updateMany=function(req,res) {
    var token5 = req.headers['x-access-token'];
    jwt.verify(token5, "secret", function (err) {
        if (err) {
            res.status(400).json(err)
        } else {
            mm.updateMany(req,body,(err, data) => {
                res.send(data)
            });
        }
    })
};

module.exports=Controllers;
