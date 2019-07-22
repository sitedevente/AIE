const BienDb = require("./BienDb");

module.exports = class DBWrapper{
    constructor (){
        this.pool = new BienDb();
    }

    getRessource (params) {
        const {primaryKey,table} = params;
        let query = `SELECT * FROM ${table}`;
        if(primaryKey.value !== undefined){
            query += ` WHERE ${primaryKey.key} = ? `;
        }
        
        return this.pool.query(query,[primaryKey.value])
        .then(([rows]) => ({
                json : rows
            }))
        .catch( err => {
            if(err.code === 'ECONNREFUSED'){
                return {
                    status : 503,
                    json : {
                        err : err.code
                    }
                };
            }
            return {
                status : 404,
                json : []
            };
        }) 
    }

    // In need to be sure that we do all setting operations or perform rollback in urgency cases.
    transaction (options){
        console.log(this);
        console.log(options)
    }

    setRessource (param) { 
        const query = `INSERT INTO ${param.table} VALUES ?`; 
        return this.pool.query(query,Object.values(param.json))
        .then( (res) => {
            console.log(res)
        })
        .catch( (err) => {
            console.log(err)
        })
    }

};
