// Normal/Prod environment Database module
const mysql2 = require('mysql2/promise');
module.exports = class BienDb{
	constructor (){
		return mysql2.createPool({
			host: process.env.DbBien_HOST || 'localhost',
			user : process.env.DbBien_USER || 'aie' ,
			password: process.env.DbBien_PASSWORD || '21504680',
			database: process.env.DbBien_DATABASE || 'aie',
			connectionLimit : process.env.DbBien_CONNECTIONLIMIT || 10,
			queueLimit : process.env.DbBien_QUEUELIMIT || 150
		});
	}
};