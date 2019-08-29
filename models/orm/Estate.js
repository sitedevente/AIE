module.exports = (database, Sequelize) => {
    const {STRING, INTEGER, TEXT, BOOLEAN} = Sequelize;
    return database.define('estate', {
        title: STRING,
        address: STRING,
        area: INTEGER,
        city: STRING,
        postalCode: STRING,
        bedroom: INTEGER,
        bathroom: INTEGER,
        details: TEXT,
        dpe: INTEGER,
        ges: INTEGER,
        location: BOOLEAN,
        price: INTEGER
    }, {
            allowNull: false
        });
};