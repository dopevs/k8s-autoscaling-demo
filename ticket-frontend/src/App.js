import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [events, setEvents] = useState([]);
  const [loadGenerating, setLoadGenerating] = useState(false);
  const [duration, setDuration] = useState(60);
  let loadInterval;
  let stopTimer;

  useEffect(() => {
    fetchEvents();
    return () => {
      clearInterval(loadInterval);
      clearTimeout(stopTimer);
    };
  }, []);

  const fetchEvents = async () => {
    const response = await fetch(`${BACKEND_URL}/events`);
    const data = await response.json();
    setEvents(data);
  };

  const startGenerateLoad = () => {
    setLoadGenerating(true);
    loadInterval = setInterval(async () => {
      try {
        await fetch(`${BACKEND_URL}/generate-load`);
      } catch (error) {
        console.error('Error generating load:', error);
      }
    }, 100);

    stopTimer = setTimeout(() => {
      stopGenerateLoad();
    }, duration * 1000);
  };

  const stopGenerateLoad = () => {
    clearInterval(loadInterval);
    clearTimeout(stopTimer);
    setLoadGenerating(false);
  };

  return (
    <div className="App">
      <h1>Ticket Booking System</h1>
      {!loadGenerating ? (
        <div>
          <input 
            type="number" 
            value={duration} 
            onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value)))} 
            min="1"
          /> seconds
          <button onClick={startGenerateLoad}>Start Generate Load</button>
        </div>
      ) : (
        <button onClick={stopGenerateLoad}>Stop Generate Load</button>
      )}
      <h2>Available Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - ${event.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
