const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Cart     = require('../../src/models/Cart.model');
const Pancake  = require('../../src/models/Pancake.model');

quantities = {}

const get = (req,res) => {
	utility.getAll(Cart,{}).then(menu=>{
		//getting quantites ordered for all the pancakes
		for (i=0;i<menu.length;i++){
			pancakes=menu[i].Pancakes;
			for(j=0;j<pancakes.length;j++){
				quantities[pancakes[j].Name]=pancakes[j].Quantity
			};
		};
		//sorting pancakes by quantities ordered
		sorted = []
		for (var quantity in quantities){
			sorted.push([quantity,quantities[quantity]])
		}
		sorted.sort((a,b)=>{
			return a > b;
		})
		
		//base score per order 
		const base_score = 10;

		leaderboard=[]
		position = 0;
		//sending leaderboard object
		for(j=sorted.length-1;j>=0;j--){
			position+=1;
			//leaderboard object
			let data={
				Name:sorted[j][0],
				Position:position,
				Points:base_score * sorted[j][1]
			};
			leaderboard.push(data)

		};
		res.json({status:"True",msg:leaderboard})
		
	}).catch(err=>{
		console.log(err)
		
	});
};

module.exports = {get};
