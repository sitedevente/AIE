const BienJoi = require('../models/joi/BienJoi');

const validBienData = {
    titre: 'test',
    adresse: 'test',
    superficie: 3000,
    ville: 'testVille',
    codePostal: 'Test',
    nbChambre: 5,
    nbSalleDEau: 2,
    descriptif: 'Whole Test HAHA',
    dpe: 245,
    ges: 34,
    location: true,
    prix: 200
}

const invalidBienData = {
    titre: 254,
    adresse: 'test',
    superficie: 3000,
    codePostal: '2A',
    nbChambre: 5,
    nbSalleDEau: 2,
    descriptif: 'Whole Test HAHA',
    dpe: 245,
    ges: 34,
    location: true,
    prix: 200
}

const validMaisonData = {
    ...validBienData,
    cave: true,
    garage: false,
    jardin: true
}

const invalidMaisonData = {
    ...invalidBienData,
    cave: true,
    garage: false,
    jardin: true
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

const maisonJoiTest = new BienJoi('Maison');

maisonJoiTest.validate(invalidMaisonData,errorHandler)
maisonJoiTest.validate(validMaisonData,errorHandler)
maisonJoiTest.validate(validBienData,errorHandler)