const Sequelize = require('sequelize');
const { database, ModelCreator } = require('../models');

const { EstateCreator, FlatCreator, HouseCreator } = ModelCreator;

const Estate = EstateCreator(database, Sequelize);
const Flat = FlatCreator(database, Sequelize, Estate);
const House = HouseCreator(database, Sequelize, Estate);

const jsonInput = { 
    Estate: {
        title: 'Also renting my estate',
        address: '1 street Pierre Loti',
        area: 350,
        city: 'Tours',
        postalCode: '37000',
        bedroom: 3,
        bathroom: 1,
        details: 'A nice place to have live, quite big and confortable',
        dpe: 256,
        ges: 125,
        location: true,
        price: 520,
    },
    type: 'flat',
    subType: {
        etage: 3,
        numPorte: '35'
    }
}

const newEstate = Estate.build(jsonInput.Estate);

const TypeBuilder = function(type,subType){
    if(type === 'House' || type === 'house'){
        return House.build(subType); 
    }else{
        return Flat.build(subType);
    }
};

return database.transaction(t => {
    return newEstate.save({transaction: t})
    .then((instance) => {
        return TypeBuilder(jsonInput.type,{
            ...jsonInput.subType,
            estateId: instance.dataValues.id
        })
        .save({transaction: t})
        .then(() => {})
    })  
})
.catch(err => {
    console.error('Heeeiinnn !',err)
});
