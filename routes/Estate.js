const {Router, json} = require('express');
const EstateController = require('../controller/EstateController');
const EstateJoi = require('../models/joi/BienJoi');


const bienCtrl = new EstateController();
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
.param('id', (req,res,next,id) => {
    if(isNaN(id)){
        return res.sendStatus(404);	
    }	
    res.locals.id = id;
    next();
})
.post('/', json(), estateValidator, bienCtrl.createEstate.bind(bienCtrl))
.get('/', bienCtrl.getAll.bind(bienCtrl))
.delete('/:id', bienCtrl.delete.bind(bienCtrl))
.get('/:id', bienCtrl.getOne.bind(bienCtrl))
.use('*', (req,res) => res.sendStatus(404))

module.exports = router;