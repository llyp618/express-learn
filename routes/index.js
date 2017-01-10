module.exports = function(app){   //返回一个函数 被index.js 调用下就可以了，以免路由过多导致程序主入口 index.js臃肿
	app.get('/',function(req,res){
		res.redirect('/posts');
	});
	app.use('/signup',require('./signup'));
	app.use('/signin',require('./signin'));
	app.use('/signout',require('./signout'));
	app.use('/posts',require('./posts'));
};