var config = require('config-lite');
var Mongolass = require('mongolass');

var moment = require('moment');
var objectIdToTimeStamp = require('objectid-to-timestamp');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

mongolass.plugin('addCreateAt',{
	afterFind:function(results){
		results.forEach(function(item){
			item.create_at = moment(objectIdToTimeStamp(item._id)).format('YYYY-MM-DD HH:mm');
		});
		return results;
	},
	afterFindOne:function(result){
		if(result){
			result.created_at = moment(objectIdToTimeStamp(result._id)).format('YYYY-MM-DD HH:mm');
		}
		return result;
	}
})
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.Post = mongolass.model('Post',{
	author:{type:Mongolass.Types.ObjectId},
	title:{type:'string'},
	content:{type:'string'},
	pv:{type:'number'}
});
exports.Post.index({author:1,_id:-1}).exec(); //按创建时间降序查看用户文章列表