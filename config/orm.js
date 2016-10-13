/*
Here is the O.R.M. where you write functions that takes inputs and conditions and turn them into database commands like SQL.
*/
var connection = require('../config/connection.js');

/*-----   setting values for blank columns  -----*/
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

/*-----   takes in an object and converts to a string  -----*/
function objToSql(ob) {
	// column1=value, column2=value2,...
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

var orm = {
	selectAll: function (tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// vals is an array of values that we want to save to cols
		// cols are the columns we want to insert the values into
	insertOne: function (table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString = queryString + ' (';
		queryString = queryString + cols.toString();
		queryString = queryString + ') ';
		queryString = queryString + 'VALUES (';
		queryString = queryString + printQuestionMarks(vals.length);
		queryString = queryString + ') ';

		console.log(queryString);

		connection.query(queryString, vals, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// objColVals would be the columns and values that you want to update
		// an example of objColVals would be {name: panther, sleepy: true}
	updateOne: function (table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString = queryString + ' SET ';
		queryString = queryString + objToSql(objColVals);
		queryString = queryString + ' WHERE ';
		queryString = queryString + condition;

		console.log(queryString);
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}//,
	/*-----   If I want to delete burgers  -----*/
	// delete: function (table, condition, cb) {
	// 	var queryString = 'DELETE FROM ' + table;
	// 	queryString = queryString + ' WHERE ';
	// 	queryString = queryString + condition;

	// 	connection.query(queryString, function (err, result) {
	// 		if (err) throw err;
	// 		cb(result);
	// 	});
	// }
};

module.exports = orm;