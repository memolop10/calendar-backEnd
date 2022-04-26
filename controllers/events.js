const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {

  const events = await Event.find()
                            .populate('user','name');//solo quiero el name del usuario

  res.json({
    ok: true,
    events
  })

}

const createEvent = async( req, res = response ) => {

  const event = new Event( req.body );

  try {
    event.user = req.uid;

    const eventSaved = await event.save();
    res.status(200).json({
      ok: true,
      event: eventSaved
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk with the manager'
    })
  }

}

const updateEvent = async( req, res = response ) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId );

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event doesnt exist with that id'
      })
    }

    if ( event.user.toString() !== uid) {
      return res.status(401).res.json({
        ok: false,
        msg:'you dont have privilege to edit this event'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new:true})
    
    res.json({
      ok:true,
      event: eventUpdated
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg:'Talk to the manager'
    })
  }

  res.json({
    ok: true,
    eventId
  })

}

const deleteEvent = async( req, res = response ) => {
  const eventId = req.params.id;
  const uid = req.uid;
  
  try {

    const event = await Event.findById( eventId );

    if (!event) {
     return res.status(404).json({
        ok: false,
        msg: 'Event doesnt exist with that id'
      })
    }

    if ( event.user.toString() !== uid) {
      return res.status(401).res.json({
        ok: false,
        msg:'you dont have privilege to delete this event'
      })
    }

    const eventDeleted = await Event.findByIdAndDelete(eventId)
    
    res.json({
      ok:true,
      event: eventDeleted
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg:'Talk to the manager'
    })
  } 

}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}