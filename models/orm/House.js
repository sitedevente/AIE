module.exports = (database, Sequelize, Parent) => {
    const {BOOLEAN} = Sequelize;
    const House = database.define('house', {
        basement: BOOLEAN,
        garage: BOOLEAN,
        garden: BOOLEAN
    }, {
            allowNull: false
    });

    House.belongsTo(Parent);
    Parent.hasOne(House);    
    return House;
};

