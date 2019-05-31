const router = require('koa-router')()
const DecryptController = require('../app/controller/decodedecrypt')
router.prefix('/openapi/jxs')
router.get('/decodedecrypt',DecryptController.decodedecrypt)//解密
router.post('/encodedecrypt',DecryptController.encodedecrypt)//加密
router.get('/time', DecryptController.getTime)
module.exports = router
