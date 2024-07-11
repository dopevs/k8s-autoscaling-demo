const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const events = [
  { id: 1, name: 'Concert A', price: 50 },
  { id: 2, name: 'Theatre Show B', price: 40 },
  { id: 3, name: 'Sports Event C', price: 60 },
];

app.get('/events', (req, res) => {
  res.json(events);
});

app.get('/generate-load', (req, res) => {
  const startTime = Date.now();
  while (Date.now() - startTime < 100) {
    // Simulate CPU-intensive task for 100ms
    for (let i = 0; i < 100000; i++) {
      Math.sqrt(i);
    }
  }
  res.send('Load generated');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
