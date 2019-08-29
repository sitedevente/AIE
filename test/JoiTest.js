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

const joiHandler = async (schema, data) => {
    const resToDisplay = {
        value: "",
        state: ""
    }    
    
    await schema.validate(data)
    .then( value => {
        resToDisplay.value = value;
        resToDisplay.state = 'success'
    })
    .catch( error => {
        resToDisplay.value = error.details;
        resToDisplay.state = 'failure'
    });
    console.log(resToDisplay.state, resToDisplay.value);
};


const houseJoiTest = new EstateJoi('house');
const flatJoiTest = new EstateJoi('flat');

Promise.all([
    joiHandler(houseJoiTest, invalidHouseData),
    joiHandler(houseJoiTest, validHouseData ),
    joiHandler(houseJoiTest, validEstateData)
])
.then( () => {
    console.log('')
    console.log('Flat now')
    joiHandler(houseJoiTest, validFlatData)
    joiHandler(flatJoiTest, validFlatData)
})
.catch( err => {
    console.log('Heinnnn', err)
})

