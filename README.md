koa2整合log4js、jwt、redis、mysql  
需要node8.11以上
# install dependencies
$ cnpm install -g koa-generator  安装脚手架工具
$ cnpm install -g nodemon 测试运行使用
$ cnpm install

# serve with hot reload at localhost:3920
$ cnpm start（修改文件后要手动重启） 或 nodemon（修改文件后自动重启）

# build for production and launch server
启动
$ pm2 start ./bin/www --watch 

重启
pm2 restart app_name|app_id

停止
pm2 stop app_name|app_id

停止所有
pm2 stop all

删除
pm2 stop app_name|app_id
pm2 stop all

查看进程状态
pm2 list

查看某个进程的信息
pm2 describe 0

负载均衡
pm2 start app.js -i 3 # 开启三个进程
pm2 start app.js -i max # 根据机器CPU核数，开启对应数目的进程
pm2 start app.js -i 0，则会根据机器当前核数自动开启尽可能多的进程

