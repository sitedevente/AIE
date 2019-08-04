const DbFactory = require('../models/database/DbFactory');
const BienJoi = require('../models/joi/BienJoi');


module.exports = class BienController{
	constructor (){
		this.manager = new DbFactory();
	}

	static idIsValid (req,res,next,id){
		if(isNaN(id)){
			return res.sendStatus(404);	
		}	
		res.locals.id = id;
		next();
	}
	
	async getBien (req,res) {
		const [paramBien,paramAppart,paramMaison] = ['bien','appartement','maison'].map( (element) => {
			const obj = {
				primaryKey : {
					key: 'idAnnonce',
					value:res.locals.id
				},
				table : element
			}
			return obj;
		});
		const {status,json} = await Promise.all([
			this.manager.getRessource(paramBien),
			this.manager.getRessource(paramAppart) ,
			this.manager.getRessource(paramMaison)
		])
		.then(([bien,appart,maison]) => {
			if(bien.json.status !== undefined){
				return{
					status: bien.status, 
					json: bien.json
				}
			}
			for(let indexAppart = 0,indexBien = 0,indexMaison = 0; indexBien < bien.json.length; indexBien += 1){
				if(appart.json.length > indexAppart && bien.json[indexBien].idAnnonce === appart.json[indexAppart].idAnnonce){
					bien.json[indexBien] = {
						type:'appartement',
						...bien.json[indexBien],
						...appart.json[indexAppart]
					};
					indexAppart += 1;
				}else{
					bien.json[indexBien] = {
						type: 'Maison',
						...bien.json[indexBien],
						...maison.json[indexMaison]
					}
					indexMaison += 1;
				}
			}
			return {
				status: 404,
				json: bien.json
			}
		})
		.catch((err) => {
			console.log(err)
		})
		res.status(status).json(json);
	}

	// eslint-disable-next-line class-methods-use-this
	async setBien (req,res) {
		const {body} = req;
		const {type,params} = body;
		const schema = new BienJoi(type)
		await schema.validate(params)
		.then(() => res.status(201))
		.catch((error) => res.status(204).json(error))
	}

	static notFound (req,res){
		return res.sendStatus(404);
	}

};