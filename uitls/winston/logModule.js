var log = require('./logger.js');
var jwt = require ('jsonwebtoken');
function LogMessageModule () {

}
LogMessageModule.prototype.error = function (req, err) {
    var logMessage = {};
    logMessage.timestamp = new Date().toUTCString();
    if (req) {
        logMessage.baseUrl = req.baseUrl;
        logMessage.rawHeaders = req.rawHeaders;
        logMessage._parsedUrl = req._parsedUrl;
        logMessage.requestMethod = req.method;
        logMessage.params = req.params;
        logMessage.headers = req.headers;
        logMessage.ip = req.ip;
        if (req.body) {
            logMessage.requestBody = req.body;
        }
    }
    else if (err) {
        logMessage.error = err;
    }
    log.error(logMessage);
};


LogMessageModule.prototype.info = function (msg,req) {
    var logMessage = {};
    logMessage.timestamp = new Date().toUTCString();
    if (req) {
        logMessage.baseUrl = req.baseUrl;
        logMessage.rawHeaders = req.rawHeaders;
        logMessage._parsedUrl = req._parsedUrl;
        logMessage.requestMethod = req.method;
        logMessage.params = req.params;
        logMessage.headers = req.headers;
        logMessage.ip = req.ip;
        if (req.body) {
            logMessage.requestBody = req.body;
        }if(req.headers['x-access-token']){
            logMessage.acess=jwt.verify(req.headers['x-access-token'],"secret")
            console.log(logMessage.acess)
        }
    }
    logMessage.message = msg;
    log.info(logMessage);
};

LogMessageModule.prototype.debug = function (msg) {
    var logMessage = {};
    logMessage.timestamp = new Date().toUTCString();
    logMessage.message = msg;
    log.debug(logMessage);
};

module.exports = LogMessageModule;

