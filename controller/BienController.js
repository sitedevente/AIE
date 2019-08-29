const Sequelize = require('sequelize');
const {database,ModelCreator} = require('../models/orm')

module.exports = class BienController{
	constructor (){
		this.Estate = ModelCreator.EstateCreator(database,Sequelize);
		this.Flat = ModelCreator.FlatCreator(database,Sequelize,this.Estate);
		this.House = ModelCreator.HouseCreator(database,Sequelize,this.Estate);
	}

	async getOne (req,res) {
		const {id} = res.locals;

		this.Estate.findByPk(id, {
			nest:true,
			raw:true,    
			include: [
				{model: this.Flat},
				{model: this.House}
			]
		})
		.then( raw => {
			const {flat, house} = raw;
			if(flat.estateId && !house.estateId){
				delete raw.house;
			}else if (house.estateId && !flat.estateId){
				delete raw.flat;
			}
			return res.status(200).json(raw);
		})
		.catch( err => res.status(400).json(err))
	}

	async getAll (){
		this.Estate.build();
	}

	async createEstate (req,res) {
		// Process json input in HTTP request body
		const {body} = req;
		const {flat,house,type,...estate} = body;
		
		// Build sequelize model instance.
		const newEstate = this.Estate.build(estate);
		
		// Build subType using factory method
		const subTypeBuilder = id => {
			if(type === 'flat'){
				return this.Flat.build({
					...flat,
					id
				})
			}else if(type === 'house'){
				return this.House.build({
					...house,
					id
				})
			}
		}
		
		// Use sequelize transaction feature to create new Estate
		// return either id or json error;
		await database.transaction(tran => newEstate.save({transaction: tran})
		.then(instance => subTypeBuilder(instance.dataValues.id)
			.save({transaction: tran})
			.then(() => res.status(201).json({id : instance.dataValues.id}))))
		.catch( err => res.status(400).json(err));
	}

};