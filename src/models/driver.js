mongoose=require('mongoose')
Filling=require('./Fillings.model')
Pancake=require('./Pancake.model')
Topping=require('./Toppings.model')
Order=require('./Order.model')
Cart=require('./Cart.model')
Review=require('./Review.model')
Board=require('./LeaderBoard.model')
Admin=require('./Admin.model')
Customer=require('./Customer.model')
Custom=require('./Custom.model')
Service= require('./Service.model')

//const db ='mongodb://localhost/FluffyFluffs'
//mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })

//customer
customer = new Customer({
	_id: new mongoose.Types.ObjectId(),
	FullName:'ABC XYZ',
	Username:'ABC',
	Passhash:"xx)xx(xx",
	Address:'->Address goes here <-',
	Email:'abc@xyz.com',
	MobileNo:120000000,

})
customer.save()

customer1 = new Customer({
	_id:new mongoose.Types.ObjectId(),
	FullName:'CBA XYZ',
	Username:'ABC',
	Address:'->Address goes here <-',
	Email:'abc@xyz.com',
	MobileNo:120000000,
	Passhash:'xx)xx(xx'
})
customer1.save()


//admin
admin = new Admin({
	_id:new mongoose.Types.ObjectId(),
	FullName:'CDE XFA',
	Username:'CDE',
	Email:'cde@xyz.com',
	Passhash:'xx)xx(xx'
})
admin.save()

//topping
topping=new Topping({
	_id:new mongoose.Types.ObjectId(),
	Name:'Honey',
	Price:20

})
topping.save()

//filling
filling=new Filling({
	_id:new mongoose.Types.ObjectId(),
	Name:'Chocolate Chips ',
	Price:50
})
filling.save()

//pancake
pancake=new Pancake({
	_id:new mongoose.Types.ObjectId(),
	Name:'Nuettela Blast',
	Description:'Filled with nuetella',
	Price:100
})
pancake.save()

//custom
custom=new Custom({
	_id:new mongoose.Types.ObjectId(),
	Name:'Neutella Bee',
	Description:'->description goes here<-',
	Layer:1,
	Filling:[filling._id],
	Topping:[topping._id],
	MadeBy:customer1._id
})

custom.save()

//cart
cart=new Cart({
	_id:new mongoose.Types.ObjectId(),
	Number_Items:1,
	Total:140,
	Tax:40,
	Items:{pancake:pancake._id,topping:topping._id},
	custom:custom._id,
	Customer:customer._id

})

cart.save()

//order
order= new Order({
	_id:new mongoose.Types.ObjectId(),
	Date:'2020-03-03',
	Sataus:'Pending',
	Order:cart._id
})
order.save()

//review
review = new Review({
	_id:new mongoose.Types.ObjectId(),
	Body:'Good Taste (^<>^)',
	PostedBy:customer._id,
	pancake:custom._id,
	Rating:5
})
review.save()

//service

service = new Service({
	_id:new mongoose.Types.ObjectId(),
	Name:'Custom Pancake',
	Status:true
})

service.save()
console.log('done')
