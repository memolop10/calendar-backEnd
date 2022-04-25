const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require("express-validator");
const { validatedFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");
const router = Router();

//Todas tienen que pasar por la validacion del JWT
router.use( validateJWT );

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title','title is required').not().isEmpty(),
        check('start','start is required').custom( isDate ),
        check('end','end is required').custom( isDate ),
        validatedFields
    ],
    createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;