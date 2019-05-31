const axios = require('axios')
const crypto = require('crypto'); 
function md5(data){
  // 以md5的格式创建一个哈希值
  let hash = crypto.createHash('md5');
  return hash.update(data).digest('base64');
}
//获取当前时间日期格式
async function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    let time = (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
    return time
}
async function getLog(str) {
    console.log('-------------------------------------')
    console.log(str)
    console.log('-------------------------------------')
}
//微信公众api使用
async function getAxios(url, parmas) {
    let message = {}
    await axios.get(url, parmas)
        .then(function (response) {
            if (response.data.errcode != undefined) {
                if (response.data.errcode != 0) {
                    message = { code: response.data.errcode, msg: response.data.errmsg, data: {} }
                } else {
                    message = { code: 1000, msg: 'ok', data: {} }
                }

            } else {
                message = { code: 1000, msg: 'ok', data: response.data }
            }
        })
        .catch(function (error) {
            message = { code: -2, msg: 'service exception', data: {} }
            console.log(error)
        });
    return message
}
async function postAxios(url, parmas) {
    let message = {}
    await axios.post(url, parmas, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function (response) {
            if (response.data.errcode != undefined) {
                if (response.data.errcode != 0) {
                    message = { code: response.data.errcode, msg: response.data.errmsg, data: {} }
                } else {
                    message = { code: 1000, msg: 'ok', data: {} }
                }

            } else {
                message = { code: 1000, msg: 'ok', data: response.data }
            }
        })
        .catch(function (error) {
            message = { code: -2, msg: 'service exception', data: {} }
            console.log(error)
        });
    return message
}
module.exports = { getTime, getLog, getAxios, postAxios,md5 }