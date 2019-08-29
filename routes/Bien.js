const {Router, json} = require('express');
const BienController = require('../controller/BienController');
const EstateJoi = require('../models/joi/BienJoi');


const bienCtrl = new BienController();
const router = new Router();

const estateValidator = async (req, res, next) => {
    const {flat, house} = req.body;
    let type = '';
    if(flat){
        type = 'flat';
    }else if (house){
        type = 'house';
    }
    const schema = new EstateJoi(type);

    await schema.validate(req.body)
    .then(() => {
        req.body.type = type;
        next();
    })
    .catch(err => res.status(400).json(err.details))
};


router
.param('id', BienController.idIsValid)
.post('/', json(), estateValidator, bienCtrl.setBien.bind(bienCtrl))
.get('/', bienCtrl.getBien.bind(bienCtrl))
.get('/:id', bienCtrl.getBien.bind(bienCtrl))
.use('*', BienController.notFound)

module.exports = router;