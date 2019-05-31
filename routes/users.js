const router = require('koa-router')()
const users = require('../app/controller/users')
router.prefix('/users')
router.post('/token', users.login)//获取jwt token
router.post('/strMd5', users.strMd5)//获取生成md5 用于jwt 密码加密
router.get('/time', users.getTime)
module.exports = router
