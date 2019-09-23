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
.param('id', (req,res,next,id) => {
    if(isNaN(id)){
        return res.sendStatus(404);	
    }	
    res.locals.id = id;
    next();
})
.post('/', json(), estateValidator, bienCtrl.createEstate.bind(bienCtrl))
.get('/', bienCtrl.getAll)
.delete('/:id', bienCtrl.delete)
.get('/:id', bienCtrl.getOne)
.use('*', (req,res) => res.sendStatus(404))

module.exports = router;