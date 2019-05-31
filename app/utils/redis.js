const Redis = require('ioredis')
const config = require('../../config/config')//引入配置文件
const redis = {
    host: config.redis.host,// Redis host
    port: config.redis.port,// Redis port
    password:config.redis.password,
    prefix: '', //存诸前缀
    ttl: 60 * 60 * 23,  //过期时间   
    family: 4,
    db: 0
}
const newRedis = new Redis(redis)
module.exports = newRedis