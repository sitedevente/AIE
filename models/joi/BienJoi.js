const Joi = require('@hapi/joi');

const bienSchema = 
Joi.object().keys({
    titre: Joi.string().required(),
    adresse: Joi.string().required(),
    superficie: Joi.number().required(),
    ville: Joi.string().required(),
    codePostal: Joi.string().required(),
    nbChambre: Joi.number().integer()
        .required(),
    nbSalleDEau: Joi.number().integer()
        .required(),
    descriptif: Joi.string().required(),
    dpe: Joi.number().integer()
        .required(),
    ges: Joi.number().integer()
        .required(),
    location: Joi.boolean()
        .required(),
    prix: Joi.number().integer()
        .required()
})
.unknown(false);


const AppartementSchema = bienSchema.keys({
    etage: Joi.number().integer()
        .required(),
    numPorte: Joi.string().required()
});

const MaisonSchema = bienSchema.keys({
    cave : Joi.boolean().required(),
    garage : Joi.boolean().required(),
    jardin : Joi.boolean().required()
});

module.exports = class BienJoiFactory{
    constructor (type){
        if(type !== "Maison" && type !== "maison"){
            return AppartementSchema;
        }
        return MaisonSchema;
    }
};