const users = require('../utils/users')
module.exports = {
    getTime: async (ctx, next) => {
        //payload = users.getJWTPayload(ctx.headers.authorization)
        //var LogFile = log4js.getLogger('commodity');
        let time = new Date().getTime();
        //LogFile.info('You can find logs-files in the log-dir');
        return ctx.body = { code: 1000, msg: 'ok', data: { time: time } }
    },
    login: async (ctx, next) => {
        let reqs = ctx.request.body
        if (reqs.secret == undefined || reqs.appKey == undefined || reqs.secret == '' || reqs.appKey == '') {
            return ctx.body = { code: 403, msg: '参数错误', data: [] }
        }
        let secret = await users.strMd5(reqs.secret)
        let userStatus = await users.getUser(reqs.appKey, secret)
        if (userStatus.length == 0) {
            return ctx.body = { code: 403, msg: 'appKey或secret错误', data: {} }
        }
        let token = await users.getToken({ userId: userStatus[0]['id'] })
        return ctx.body = { code: 1000, msg: 'success', data: token }
    },
    strMd5: async (ctx, next) => {
        let str = ctx.request.body.str
        let md5 = await users.strMd5(str)
        return ctx.body = { code: 1000, msg: 'success', data: { 'str': str, 'md5': md5 } }
    }
}