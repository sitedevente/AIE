// Normal/Prod environment Database module
const mysql2 = require('mysql2/promise');
module.exports = class BienDb{
	constructor (){
		return mysql2.createPool({
			host: 'localhost',
			user : 'aie' ,
			password: '21504680',
			database: 'aie',
			connectionLimit : 10,
			queueLimit : 150
		});
	}
};