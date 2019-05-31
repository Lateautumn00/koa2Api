const config = require('../../config/config')//引入配置文件
const { query } = require('./async-db')
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const publicFunction = require('./publicFunction')
async function getUser(appKey, secret) {
    let sql = "select * from " + config.mysql.prefix + "jwt_user where appKey=? and secret=? and status=1"
    let user = await query(sql, [appKey, secret])
    return user
}
async function getToken(payload = {}) {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: '6h' });
}
// 验证并解析JWT
// async function getJWTPayload(token) {
//     return jwt.verify(token.split(' ')[1], config.jwt.secret);
// }
async function strMd5(str){
    return publicFunction.md5(publicFunction.md5(str)+config.md5.token)
}

module.exports = { getUser, getToken, strMd5 }