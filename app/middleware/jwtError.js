/* 当token验证异常时候的处理，如token过期、token错误 */
const config = require('../../config/config')//引入配置文件
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
module.exports = function () {
    return async function (ctx, next) {
        try {
            let token = ctx.headers.authorization
            if (token) {
                let payload
                try {
                    payload = jwt.verify(token.split(' ')[1], config.jwt.secret)

                } catch (error) {
                    ctx.status = 401
                    ctx.body = {
                        code: 401,
                        message: "token verify fail:" + error.message
                    }
                }
            }
            await next()
        } catch (error) {
            if (error.status === 401) {
                ctx.status = 401
                ctx.body = {
                    code: 401,
                    message: '认证失败'
                }
            } else {
                error.status = 404
                ctx.body = {
                    code: 404,
                    message: "404"
                }
            }
        }

    }
}