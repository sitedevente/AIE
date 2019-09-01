const {database} = require('../models/orm')

const filter = (estate) => {
	const {flat, house} = estate;
	if(flat.estateId && !house.estateId){
		delete estate.house;
	}else if (house.estateId && !flat.estateId){
		delete estate.flat;
	}
	return estate;
}


module.exports = class BienController{
	constructor (){
		const {estate, flat, house} = database.models;
		this.Estate = estate;
		this.Flat = flat;
		this.House = house;
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
			const filtered = filter(raw);
			return res.status(200).json(filtered);
		})
		.catch( err => res.status(400).json(err))
	}

	async getAll (req,res){
		this.Estate.findAll({
			nest:true,
			raw:true,
			include: [
				{model: this.Flat},
				{model: this.House}
			],
			order: [['id', 'DESC']]
		})
		.then( raws => {
			const filteredArray = raws.map( raw => filter(raw));
			return res.status(200).json(filteredArray);
		})
		.catch( err => res.status(400).json(err))
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
					estateId: id
				})
			}else if(type === 'house'){
				return this.House.build({
					...house,
					estateId: id
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

	async delete (req,res){
		const {id} = res.locals;

		this.Estate.findByPk(id, {
			include: [
				{model: this.Flat},
				{model: this.House}
			]
		})
		.then( raw => {
			raw.destroy()
			.then(() => res.sendStatus(200))
		})
		.catch( err => res.status(400).json(err))
	}


};