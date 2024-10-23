const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { google } = require('googleapis');
const sequelize = require("./database");
const EventModel = require('./model/event')

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

// Route for Google OAuth
app.get("/google", async (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

// Google OAuth Redirect Handler
app.get("/google/redirect", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: oauth2Client
    });

    const eventsResponse = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = eventsResponse.data.items;

    // Insert events into PostgreSQL using Sequelize
    for (const event of events) {
      const { id: event_id, summary, start, end, location, description } = event;

      const startTime = new Date(start.dateTime || start.date);
      const endTime = new Date(end.dateTime || end.date);

      try {
        await EventModel.create({
          event_id,          // Include the event_id in the main object
          summary,
          start_time: startTime,
          end_time: endTime,
          location: location || null,
          description: description || null,
        });
      } catch (err) {
        console.error('Error inserting event into database:', err);
      }
    }
    res.redirect('http://localhost:3000/events');

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching calendar events' });
  }
});

// Fetch Events from Google Calendar and Save to PostgreSQL
app.get('/events', async (req, res) => {
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
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
