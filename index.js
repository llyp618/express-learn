var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var falsh = require('connect-flash');
var config = require('config-lite');
var routes = reuqire('./routes');
var pkg = require('./package');
var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));

//session中间件
app.use(session({
	name:config.session.key, //设置cookie中保存session id的字段名称
	secret:config.session.secret, //
}));