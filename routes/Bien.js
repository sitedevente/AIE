const {Router,json} = require('express');
const BienController = require('../controller/BienController');

const bienCtrl = new BienController();
const router = new Router();

// problem here in body req

router
.param('id',BienController.idIsValid)
.post('/', json() , bienCtrl.setBien.bind(bienCtrl)) 
.get('/', bienCtrl.getBien.bind(bienCtrl))
.get('/:id', bienCtrl.getBien.bind(bienCtrl))
.use('*',BienController.notFound)

module.exports = router;