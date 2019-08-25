const Sequelize = require('sequelize');
const { database, ModelCreator } = require('./models');

database.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})


const { EstateCreator, FlatCreator, HouseCreator } = ModelCreator;

const Estate = EstateCreator(database, Sequelize);

const Flat = FlatCreator(database, Sequelize, Estate);

const House = HouseCreator(database, Sequelize, Estate);

database.sync({
    forces: true
}).then(() => {
    console.log('Sucessfully created')
})
.catch(err => {
    console.error(err)
});
