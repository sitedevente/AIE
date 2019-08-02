const BienJoi = require('../models/joi/BienJoi');

const validBienSchema = {
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

const invalidBienSchema = {
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

const invalidMaisonSchema = {
    ...invalidBienSchema,
    cave: true,
    garage: false,
    jardin: true
}


const maisonJoiTest = new BienJoi('Maison');

const {error, value} = maisonJoiTest.validate(invalidMaisonSchema);

if(error && error.details){
    console.log('failure')
    console.log(error)
}else{
    console.log('success')
    console.log(value)
}

console.log('Test Ended')