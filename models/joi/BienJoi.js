const Joi = require('@hapi/joi');

const estateSchema = Joi.object().keys({
    title: Joi.string().required(),
    address: Joi.string().required(),
    area: Joi.number().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    bedroom: Joi.number().integer()
        .required(),
    bathroom: Joi.number().integer()
        .required(),
    details: Joi.string().required(),
    dpe: Joi.number().integer()
        .required(),
    ges: Joi.number().integer()
        .required(),
    location: Joi.boolean()
        .required(),
    price: Joi.number().integer()
        .required()
})
.unknown(false);

const flatSchema = estateSchema.keys({
    flat: Joi.object().keys({
        floor: Joi.number().integer()
            .required(),
        doorTag: Joi.string().required()
    })
    .required()
});

const houseSchema = estateSchema.keys({
    house: Joi.object().keys({
        basement: Joi.boolean().required(),
        garage: Joi.boolean().required(),
        garden: Joi.boolean().required()
    })
    .required()
});

module.exports = class EstateJoiFactory {
    constructor (subType) {
        if (subType === 'flat') {
            return flatSchema;
        } else if (subType === 'house') {
            return houseSchema;
        }
        throw new Error('Not a valid subtype validator');
    }
};