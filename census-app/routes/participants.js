const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const participantController = require('../controllers/participantController');

// auth middleware to routes
router.use(authMiddleware);

// CRUD routes
router.post('/add', participantController.addParticipant);
router.get('/', participantController.getAllParticipants);
router.get('/details', participantController.getAllParticipantDetails);
router.get('/details/:email', participantController.getParticipantDetails);
router.get('/work/:email', participantController.getParticipantWork);
router.get('/home/:email', participantController.getParticipantHome);
router.delete('/:email', participantController.deleteParticipant);
router.put('/:email', participantController.updateParticipant);

module.exports = router;
