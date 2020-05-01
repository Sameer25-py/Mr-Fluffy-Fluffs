mongoose= require('mongoose')
ttl = require('mongoose-ttl')
schema = mongoose.Schema

Code=new schema({
	_id: schema.Types.ObjectId,
	code:Number,
	customer :String
},
{
		timestamps:true
})

Code.plugin(ttl,{ttl:1000*60*30})

module.exports=mongoose.model('Code',Code)
