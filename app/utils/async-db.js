const mysql = require('mysql')
const config = require('../../config/config')//引入配置文件
const pool = mysql.createPool({
  host     :  config.mysql.host,
  user     :  config.mysql.user,
  password :  config.mysql.password,
  database :  config.mysql.database
})

//将数据库的异步操作，封装在一个Promise中
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }