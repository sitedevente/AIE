/* eslint-disable no-sync */
const fs = require('fs');

// This module is a test database
// It should thus be ready to use before the whole main app is launched
// So sync methods should be used to prevent app to launch before data are available
const readJson = (filename) => {
    try{
        const rawdata = fs.readFileSync(filename);
        const data = JSON.parse(rawdata);
        return data; 
    }catch(err){
        console.log(err)    
    }
    return {};
}


// Database to use in developpement 
// This database should be distributed by a database factory when 
module.export = class DevDb{

    constructor (){
        this.table.bien = readJson("./tableBien.json");
        this.table.appart = readJson("./tableAppart.json");
        this.table.maison = readJson("./tableMaison.json");
    }

    getRessource (params){

    }

    post (){

    }

    put (){

    }

    delete (){

    }

};