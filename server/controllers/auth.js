const { google } = require('googleapis');
const EventModel = require('../model/event')
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
  );
  
  const scopes = ['https://www.googleapis.com/auth/calendar'];
  
  // Route for Google OAuth
  const googleAuth = async (req, res) => {
    try {
      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });
      res.redirect(url);
    } catch (error) {
      console.log(error);
      
    }
    
  }
  
  // Google OAuth Redirect Handler
  const googleRedirect = async (req, res) => {
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
  
      for (const event of events) {
        const { id: event_id, summary, start, end, location, description } = event;
  
        const startTime = new Date(start.dateTime || start.date);
        const endTime = new Date(end.dateTime || end.date);
  
        try {
          await EventModel.create({
            event_id,      
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
  }

  module.exports = {googleAuth , googleRedirect}