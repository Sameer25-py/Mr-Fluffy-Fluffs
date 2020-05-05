mongoose= require('mongoose')
schema = mongoose.Schema
Pancake= new schema({
	_id: schema.Types.ObjectId,
	Name:String,
	Description:String,
	Price:Number,
	Path:String	
})

module.exports=mongoose.model('Pancake',Pancake)
