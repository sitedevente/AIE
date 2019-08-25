const Sequelize = require('sequelize');
const { database, ModelCreator } = require('../models');

const { EstateCreator, FlatCreator, HouseCreator } = ModelCreator;

const Estate = EstateCreator(database, Sequelize);
const Flat = FlatCreator(database, Sequelize, Estate);
const House = HouseCreator(database, Sequelize, Estate);

Estate.findByPk(2, {
    include: [{
        model: Flat, 
    }],
    raw:true
})
.then( raw => console.log(raw))
