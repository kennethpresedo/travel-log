const express = require('express')
const router = express.Router()
const travelCtrl = require('../../controllers/api/travels')


// Index /api/travels
router.get('/', travelCtrl.indexNotComplete, travelCtrl.jsonTravels)
// Index /api/travels/completed
router.get('/completed', travelCtrl.indexComplete, travelCtrl.jsonTravels)
// Delete /api/travels/:id
router.delete('/:id', travelCtrl.destroy, travelCtrl.jsonTravel)
// Update /api/travels/:id
router.put('/:id', travelCtrl.update, travelCtrl.jsonTravel)
// Create /api/travels
router.post('/', travelCtrl.create, travelCtrl.jsonTravel)
// Show /api/travels/:id
router.get('/:id', travelCtrl.show, travelCtrl.jsonTravel)

module.exports = router