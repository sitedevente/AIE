module.exports = (database, Sequelize) => {
    const {BOOLEAN} = Sequelize;
    const House = database.define('house', {
        basement: BOOLEAN,
        garage: BOOLEAN,
        garden: BOOLEAN
    }, {
            allowNull: false
    });

    const {estate} = database.models;

    House.belongsTo(estate);
    estate.hasOne(House);    
    return House;
};

