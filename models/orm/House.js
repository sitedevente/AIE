module.exports = (database, Sequelize, Parent) => {
    const { INTEGER, BOOLEAN } = Sequelize;
    const House = database.define('house', {
        basement: BOOLEAN,
        garage: BOOLEAN,
        garden: BOOLEAN
    }, {
            allowNull: false
    });

    House.belongsTo(Parent) ;
    
    return House;
};

