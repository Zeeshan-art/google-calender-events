import axios from "axios";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Events from "./pages/Events";
import LoginWithGoogle from "./pages/LoginWithGoogle";

const App = () => {
  // const [events, setEvents] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [userAuthenticated, setUserAuthenticated] = useState(false);

  // // Function to handle Google OAuth login
  // const handleGoogleLogin = async () => {
  //   try {
  //     // Call your backend's /google endpoint to redirect to Google OAuth
  //     window.location.href = "http://localhost:5000/google";  // Redirect to the backend's Google OAuth URL
  //     setUserAuthenticated(true)
  //   } catch (error) {
  //     setError('Error during Google login');
  //   }
  // };

  // // Function to fetch calendar events
  // const fetchEvents = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get("http://localhost:5000/events");  // Fetch events from backend
  //     setEvents(res.data.events);  // Assume user is authenticated if events are successfully fetched
  //   } catch (error) {
  //     setError('Failed to fetch calendar events');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchEvents();  // Fetch events on component mount
  // }, []);

  return (
    <Router>
      <Routes>
      <Route
          path="/login"
          element={<LoginWithGoogle/>
          }
        />
      <Route
          path="/events"
          element={<Events/>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

    // <div className="container mx-auto p-4 max-w-4xl">
    //   <h1 className="text-3xl font-bold mb-8 text-center">Google Calendar Events</h1>

    //   {!userAuthenticated && (
    //     <div className="text-center mb-8">
    //       <button
    //         onClick={handleGoogleLogin}
    //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    //       >
    //         Connect with Google
    //       </button>
    //     </div>
    //   )}

    //   {loading && <p>Loading events...</p>}
    //   {error && <p className="text-red-500">{error}</p>}

    //   {userAuthenticated && <div className="grid gap-6">
    //     {events.map((event) => (
    //       <div key={event.id} className="p-4 border rounded shadow">
    //         <h2 className="text-xl font-semibold">{event.summary}</h2>
    //         <p className="text-gray-500">
    //           {new Date(event.start.dateTime || event.start.date).toLocaleString()} - 
    //           {new Date(event.end.dateTime || event.end.date).toLocaleString()}
    //         </p>
    //         {event.location && <p className="text-gray-600">📍 {event.location}</p>}
    //         {event.description && <p className="text-gray-600">{event.description}</p>}
    //       </div>
    //     ))}
    //   </div>}

    //   {events.length === 0 && !loading && (
    //     <p className="text-center text-gray-500 mt-8">No events found. Connect with Google to see your events here.</p>
    //   )}
    // </div>
  );
};

export default App;
