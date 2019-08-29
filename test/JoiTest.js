const EstateJoi = require('../models/joi/BienJoi');

const validEstateData = {
    title: 'test',
    address: 'test',
    area: 3000,
    city: 'testVille',
    postalCode: 'Test',
    bedroom: 5,
    bathroom: 2,
    details: 'Whole Test HAHA',
    dpe: 245,
    ges: 34,
    location: true,
    price: 200
}

const invalidEstateData = {
    title: 254,
    address: 'test',
    area: 3000,
    postalCode: '2A',
    bedroom: 5,
    bathroom: 2,
    details: 'Whole Test HAHA',
    dpe: 245,
    ges: 34,
    location: true,
    price: 200
}

const validFlatData = {
    ...validEstateData,
    flat:{
        doorTag: '2E',
        floor: 2
    }
};

const validHouseData = {
    ...validEstateData,
    house:{
        basement: true,
        garage: false,
        garden: true
    }
}

const invalidHouseData = {
    ...invalidEstateData,
    house:{
        basement: true,
        garage: false,
        garden: true
    }   
}

// eslint-disable-next-line func-style
const errorHandler = (error,value) => {
    if(error){
        console.log('failure')
        console.log(error.details)
    }else{
        console.log('success')
        console.log(value)
    }
    console.log('Test Ended')
    console.log('');
}

const houseJoiTest = new EstateJoi('house');

const flatJoiTest = new EstateJoi('flat');

houseJoiTest.validate(invalidHouseData,errorHandler)
houseJoiTest.validate(validHouseData,errorHandler)
houseJoiTest.validate(validEstateData,errorHandler)

console.log('flat now')

houseJoiTest.validate(validFlatData,errorHandler)
flatJoiTest.validate(validFlatData,errorHandler)
