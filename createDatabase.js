const {database} = require('./models/orm');

database.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})

database.sync({
    forces: true
}).then(() => {
    console.log('Sucessfully created')
})
.catch(err => {
    console.error(err)
});
