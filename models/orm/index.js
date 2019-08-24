const Sequelize = require('sequelize');

const sequelize = new Sequelize('Estate', 'root', 'root', {
    define: {
        timestamps: false
    },
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const EstateCreator = require('./Estate');
const FlatCreator = require('./Flat');
const HouseCreator = require('./House');

module.exports.database = sequelize;
module.exports.ModelCreator = {
    EstateCreator,
    FlatCreator,
    HouseCreator
};

