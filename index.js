var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));

//session中间件
app.use(session({
	name:config.session.key, //设置cookie中保存session id的字段名称
	secret:config.session.secret, //通过设置secret来计算hash值并放在cookie中，使产生的signedCookie 防篡改
	cookie:{
		maxAge:config.session.maxAge //过期时间，过期后cookie中的session id自动删除
	},
	store:new MongoStore({ //将session存储在mongodb
		url:config.mongodb //mongodb地址
	})
}));

// flash 中间件，用来显示通知
app.use(flash());

//路由

routes(app);

// 监听端口，启动程序

app.listen(config.port,function(){
	console.log(`${pkg.name} listening on port ${config.port}`);
})