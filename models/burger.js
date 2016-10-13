/*
Here is where you setup a model for how to interface with the database.
*/

var orm = require('../config/orm.js');

var burger = {
	selectAll: function (cb) {
		orm.selectAll('burgers', function (res) {
			cb(res);
		});
	},
	// cols and vals are arrays
	insertOne: function (name, cb) {
		orm.insertOne('burgers',['burger_name', 'devoured'], [name, false],	cb);
	},
	updateOne: function (id, cb) {
		var condition = 'id=' + id;
		orm.updateOne('burgers', {devoured: true}, condition, cb);
	}
};

module.exports = burger;