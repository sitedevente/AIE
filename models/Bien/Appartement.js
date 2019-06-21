const Bien = require('./Bien');


module.exports = class Appartement extends Bien{
    constructor (params){
        super(params);
        const {something} = params;
        this.something = something || 0;
    }

    
};
