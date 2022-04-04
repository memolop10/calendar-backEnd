const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

router.get('/', validateJWT, getEvents);

router.post('/', validateJWT,createEvent);

router.put('/:id', validateJWT, updateEvent);

router.delete('/:id', validateJWT, deleteEvent);

module.exports = router;