import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import Transcription from './components/Transcription';
import Questions from './components/Questions';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Auth />
        ) : (
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/transcription" element={<Transcription />} />
            <Route path="/question" element={<Questions />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
