module.exports = class Bien{
    constructor (params){
        this.idAnnonce = params.idAnnonce || 0;
        this.titre = params.titre;
        // Continue with creation process 

    }    

    // Read a Bien (Unoptimized reading !!) ?????
    async read (options){
        const {id} = options;
        let query = ` SELECT * FROM  bien `;
        if(id !== undefined){
            query += `WHERE idAnnonce = ${this.id}`
        }

        return query;
        // await Use Database mysql2 promise !!
        // Process data here !!
        // return res;
    }
    
    // Save a Bien 
    async save (){

    }
    
};