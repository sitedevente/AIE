module.exports = (database, Sequelize, Parent) => {
    const {STRING, INTEGER} = Sequelize;
    const Flat = database.define('flat', {
        floor: INTEGER,
        doorTag: STRING
    }, {
            allowNull: false
    })

    Flat.belongsTo(Parent);
    Parent.hasOne(Flat);
    return Flat;
};
