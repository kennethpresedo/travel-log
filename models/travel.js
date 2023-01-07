const { model, Schema } = require('mongoose')

const travelSchema = new Schema({
    title: {required: true, type: String},
    country: {required: true, type: String},
    season: {required: true, type: String},
    duration: {required: true, type: String},
    year: {required: true, type: String},
    completed: { required: true, type: String}
}, {
    timestamps: true
})

const Travel = model('Travel', travelSchema)

module.exports = Travel;