var winston = require('winston');

let loggerTrans=require('../../my');

var info = new winston.createLogger({
    level: 'info',
    transports: [
        new (winston.transports.File)(loggerTrans[loggerTrans.length-1].logtransports)
    ],
    exitOnError: false
});
var error = new winston.createLogger({
    level: 'error',
    transports: [
        new (winston.transports.File)(loggerTrans[loggerTrans.length-1].logtransports)
    ],
    exitOnError: false
});
var debug = new winston.createLogger({
    level: 'debug',
    transports: [
        new (winston.transports.File)(loggerTrans[loggerTrans.length-1].logtransports)
    ],
    exitOnError: false
});

module.exports = {
    info: function (msg) {
        info.info(msg);
    },
    error: function (msg, req) {
        error.error(msg, req);
    },
    debug: function (msg) {
        debug.debug(msg);
    }
};
