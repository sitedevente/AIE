const BienJoi = require('../models/joi/BienJoi');

BienJoi.testDisp();

const maisonJoiTest = new BienJoi('Maison');

console.log(maisonJoiTest !== undefined)

console.log('Test Ended')
