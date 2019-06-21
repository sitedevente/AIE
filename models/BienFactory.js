const Appartement = require('./Bien/Appartement');
const Maison = require('./Bien/Maison');

module.exports = class BienFactory{
    static createBien (params){
        const {type, ...others} = params;
    
        if(type === 'Maison'){
            return new Maison(others);
        }else if(type === undefined){
            return new Appartement(others);
        }
        return {err : 'Invalid parameters'};
    }

    static isAppartement (bien){
        return bien instanceof Appartement;
    }

    static isMaison (bien){
        return bien instanceof Maison;
    }

};


