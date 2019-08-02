const Joi = require('joi');

module.exports = class BienFactory{
    constructor (){
        this.schema = Joi.object.keys({
            att1 : Joi.string().required(),
            att2: Joi.number()
                .integer()
                .min(0)
                .max()
                .optional()
        });
    }
    
    async create (params){
        const { value, error } = Joi.validate(params, this.schema)
        if(error && error.details){
            console.log(error);
            return {
                status : 400,
                json: error
            };
        }
        return Bien(params);
    }


};