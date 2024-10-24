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
  );
};

export default App;
