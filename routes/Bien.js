const mysql2 = require('mysql2/promise');
const {Router,json} = require('express');
const BienController = require('../controller/BienController');

class BienDb{
	constructor (){
		this.pool = mysql2.createPool({
			host: 'localhost',
			user : 'aie' ,
			password: '21504680',
			database: 'aie',
			connectionLimit : 10,
			queueLimit : 150
		});
	}

	getPool (){
		return this.pool;
	}
}

const db = new BienDb();
const bienCtrl = new BienController(db.getPool());
const router = new Router();

// problem here in body req

router
.param('id',BienController.idIsValid)
.post('/', json() , bienCtrl.setBien.bind(bienCtrl)) 
.get('/', bienCtrl.getBien.bind(bienCtrl))
.get('/:id', bienCtrl.getBien.bind(bienCtrl))
.use('*',BienController.notFound)

module.exports = router;