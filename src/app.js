const express = require('express');

const app = express();
app.use(express.json());

let sessions = [
  { id: 1, title: 'Skills Training', date: '2026-06-01', attendance: 18 },
  { id: 2, title: 'Match Simulation', date: '2026-06-08', attendance: 22 }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AFL Training Tracker API is running' });
});

app.get('/sessions', (req, res) => {
  res.json(sessions);
});

app.post('/sessions', (req, res) => {
  const newSession = {
    id: sessions.length + 1,
    title: req.body.title,
    date: req.body.date,
    attendance: req.body.attendance || 0
  };

  sessions.push(newSession);
  res.status(201).json(newSession);
});

app.put('/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const session = sessions.find(s => s.id === id);

  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  session.title = req.body.title || session.title;
  session.date = req.body.date || session.date;
  session.attendance = req.body.attendance ?? session.attendance;

  res.json(session);
});

app.delete('/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  sessions = sessions.filter(s => s.id !== id);
  res.json({ message: 'Session deleted' });
});

module.exports = app;