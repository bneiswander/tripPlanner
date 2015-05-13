var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/tripPlanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var schema = mongoose.Schema; 

var placeSchema = new schema({
	address: String, 
	city: String,
	state: String,
	phone: String,
	location: []
});
placeSchema.index({ location: '2d' }); 

var hotelSchema = new schema({
	name: String,
	place: String,
	num_stars: {type: Number, min: 1, max: 5},
	amenities: {
		type: [], 
		get: function(arr){
			return arr.join(',');
		},
		set: function(str){
			if(typeof str === 'string') return str.trim().split(",");
			return str; 
		}
	}
});

var toDoSchema = new schema({
	name: String,
	place: String,
	age_range: String
});

var RestaurantSchema = new schema({
	name: String,
	place: String,
	cuisine: {
		type: [], 
		get: function(arr){
			return arr.join(',');
		},
		set: function(str){
			if(typeof str === 'string') return str.trim().split(",");
			return str; 
		}
	},
	price: {type: Number, min: 1, max: 5},
});


module.exports = {
	Place: mongoose.model('Place', placeSchema),
	Hotel: mongoose.model('Hotel', hotelSchema),
	ThingToDo: mongoose.model('Todo', toDoSchema),
	Restaurant: mongoose.model('Restaurant', RestaurantSchema)
}; 
