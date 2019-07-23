// Database distributing module 
const DBWrapper = require("./DBWrapper");
const TestDb = require("../test/database/TestDb");

module.exports = class DbFactory{
	constructor (){
        const NODE_ENV = process.NODE_ENV || 'prod';
        if(NODE_ENV === 'prod'){
            return new DBWrapper();
        }
        return new TestDb();
	}
};