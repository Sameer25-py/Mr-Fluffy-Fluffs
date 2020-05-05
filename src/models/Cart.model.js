mongoose= require('mongoose')
schema = mongoose.Schema

Cart= new schema({
	_id: schema.Types.ObjectId,
	Subtotal:Number,
	Deliveryfee:Number,
	Total:Number,
	Date:String,
	Pancakes:[
		{	Quantity:Number,
			Name:String,
			Price:Number,
			Addons:[
				{
				Name:String,
				Price:String
				}
			]	
		}

	],
	Status:String,
	Tracking_ID:String,
	Address : String,
	Username:String
});


module.exports=mongoose.model('Cart',Cart)