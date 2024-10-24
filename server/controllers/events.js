const EventModel = require('../model/event')
const events = async (req, res) => {
    try {
      const events = await EventModel.findAll({
        order: [['start_time', 'ASC']],
      });
      console.log(events,'events');
      
      res.json(events);
    } catch (error) {
      console.error('Error fetching events from database:', error);
      res.status(500).json({ error: 'Error fetching events from the database' });
    }
  };

  module.exports = { events }
  