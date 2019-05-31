var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../../logs')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error.log";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
//var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response.log";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
module.exports = {
　　//日志格式等设置
    appenders:
    {
        "rule-console": {"type": "console"},
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "pattern": "-yyyy-MM-dd-hh",
            "alwaysIncludePattern": true,
            "encoding":"utf-8",
            "daysToKeep":30,
            "keepFileExt":true
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd-hh",
            "alwaysIncludePattern": true,
            "encoding":"utf-8",
            "daysToKeep":30,
            "keepFileExt":true
        },
        // "infoLogger":{
        //     "type": "file",
        //     "filename": baseLogPath  + "/infoLogger/info",
        // }
    },
 　　//供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "http": {"appenders": ["resLogger"],"level": "info"},
        //"commodity":{"appenders": ["infoLogger"],"level": "all"}
    },
    disableClustering: true,
    "baseLogPath": baseLogPath 
}