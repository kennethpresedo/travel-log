// /controllers/api/travels

const Travel = require('../../models/travel')

module.exports = {
    create,
    indexComplete,
    indexNotComplete,
    show,
    update,
    destroy,
    jsonTravels,
    jsonTravel
}


// jsonTravels, jsonTravel

function jsonTravel (req, res){
    res.json(res.locals.data.travel)
}

function jsonTravels (req, res){
    res.json(res.locals.data.travels)
}


// create
async function create(req, res, next){
    try {
        const travel = await Travel.create(req.body)
        console.log(travel)
        res.locals.data.travel = travel
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })        
    }
}


// read - index, show
async function indexComplete(req, res, next){
    try {
        const travels = await Travel.find({ completed: true })
        res.locals.data.travels = travels
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}

async function indexNotComplete(req, res, next){
    try {
        const travels = await Travel.find({ completed: true })
        res.locals.data.travels = travels
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}

async function show(req, res, next){
    try {
        const travel = await Travel.findById(req.params.id)
        res.locals.data.travel = travel
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}



// update

async function update(req, res, next){
    try {
        const travel = await Travel.findByIdAndUpdate(req.params.id, req.body, { new : true })
        res.locals.data.travel = travel
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}


// destroy

async function destroy(req, res, next){
    try {
        const travel = await Travel.findByIdAndDelete(req.params.id)
        res.locals.data.travel = travel
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}