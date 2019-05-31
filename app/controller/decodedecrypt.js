const crypto = require('crypto')
const fs = require('fs')
module.exports = {
    getTime: async (ctx, next) => {
        let time = new Date().getTime();
        return ctx.body = { code: 1000, msg: 'ok', data: { time: time } }
    },
    decodedecrypt: async (ctx, next) => {
        const privateKey = fs.readFileSync('./key/pkcs8_private_key.pem').toString('ascii');//私钥
        let encryptedStr = ctx.header.authorization
        // 解密
        let buffer2 = new Buffer(encryptedStr, 'base64')
        let decrypted = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_PADDING // 注意这里的常量值 兼容java（java默认pkcs1）
            },
            buffer2
        )
        ctx.body = decrypted.toString("utf8")
    },
    encodedecrypt: async (ctx, next) => {
        const publicKey = fs.readFileSync('./key/pkcs8_pub_key.pem').toString('ascii');//公钥
        // 明文必须为json格式
        let data = JSON.stringify(ctx.request.body)
        let buffer = new Buffer(data)
        let encrypted = crypto.publicEncrypt({
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING // 注意这里的常量值 兼容java（java默认pkcs1）
            }, buffer)
        // 密文
        let encryptedStr = encrypted.toString('base64')
        ctx.body = encryptedStr
    }
}