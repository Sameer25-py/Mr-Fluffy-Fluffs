mongoose= require('mongoose')
schema = mongoose.Schema

Cart= new schema({
	_id: schema.Types.ObjectId,
	Total_items:Number,
	Total:Number,
	Tax:Number,
	Date:String,
	Items:[
		{
			pancake:{
				Name:String,
				Price:Number
			},
			toppings:{
				Name:String,
				Price:Number
			}	
		}
	],
	Customer:{
		Username:String	
		}	
});


module.exports=mongoose.model('Cart',Cart)