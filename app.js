var cluster=require('cluster');
const myprocessors = require('os').cpus().length;
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < myprocessors; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    var express =require('express');
    var mongoose= require ('mongoose');
    var winston = require('winston');
    Logger = require('./uitls/winston/logModule');
//const bodyparser=require('body-parser');
    const cors=require('cors');
    var log=new Logger();
    var port =process.env.PORT||8090;
    var bodyjson=express.json({limit:'5mb',urlencoded:true});
    var displaydata="<h1>welcome to my website</h1>";

    mongoose.connect('mongodb://localhost:27017/mydata', {useNewUrlParser: true}).then(()=>(console.log("moongoose is connected")),err=>(console.log("mongoose connection lost")));

    mongoose.connection.on('connected', function () {
        log.info('Mongoose default connection open to ');
    });
    mongoose.connection.on('error', function (err) {
        log.error('Mongoose default connection error: ');
    });
    mongoose.connection.on('disconnected', function () {
        log.info('Mongoose default connection disconnected');
    });
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            log.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
    module.exports = express().get('/', (req, res) => {
        res.send(displaydata);
    }).use(function (req, res, next) {
        req.header("x-access-token", "application/json");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, HEAD");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,X-TOTAL-COUNT, X-access-token");
        next();
    }).use(bodyjson).use('/api', require('./routes')).listen(port, () => {
        console.log(`it is running on ${port}`);
    })
};