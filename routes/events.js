const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

//Todas tienen que pasar por la validacion del JWT
router.use( validateJWT );

router.get('/', getEvents);

router.post('/',createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;