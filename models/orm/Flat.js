module.exports = (database, Sequelize) => {
    const {STRING, INTEGER} = Sequelize;
    const Flat = database.define('flat', {
        floor: INTEGER,
        doorTag: STRING
    }, {
            allowNull: false
    })

    const {estate} = database.models;
    Flat.belongsTo(estate);
    estate.hasOne(Flat);
    
    return Flat;
};
