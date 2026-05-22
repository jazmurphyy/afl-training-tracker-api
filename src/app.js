const express = require('express');

const app = express();
app.use(express.json());

let sessions = [
  { id: 1, title: 'Skills Training', date: '2026-06-01', attendance: 18 },
  { id: 2, title: 'Match Simulation', date: '2026-06-08', attendance: 22 }
];

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AFL Training Tracker API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background: #f4f4f4;
        }
        h1 { color: #222; }
        section {
          background: white;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
        }
        button {
          padding: 10px 15px;
          margin-top: 10px;
          cursor: pointer;
        }
        input {
          padding: 8px;
          margin: 5px;
        }
        pre {
          background: #222;
          color: #0f0;
          padding: 15px;
          overflow: auto;
        }
      </style>
    </head>
    <body>
      <h1>AFL Training Tracker API</h1>
      <p>This homepage demonstrates interaction with the API CRUD endpoints.</p>

      <section>
        <h2>View Training Sessions</h2>
        <button onclick="getSessions()">Load Sessions</button>
      </section>

      <section>
        <h2>Create Training Session</h2>
        <input id="title" placeholder="Session title">
        <input id="date" placeholder="Date e.g. 2026-06-20">
        <input id="location" placeholder="Location">
        <input id="attendance" placeholder="Attendance" type="number">
        <button onclick="createSession()">Create Session</button>
      </section>

      <section>
        <h2>Update Attendance</h2>
        <input id="updateId" placeholder="Session ID" type="number">
        <input id="updateAttendance" placeholder="New attendance" type="number">
        <button onclick="updateSession()">Update Session</button>
      </section>

      <section>
        <h2>Delete Training Session</h2>
        <input id="deleteId" placeholder="Session ID" type="number">
        <button onclick="deleteSession()">Delete Session</button>
      </section>

      <h2>API Response</h2>
      <pre id="output">Responses will appear here...</pre>

      <script>
        const output = document.getElementById('output');

        function show(data) {
          output.textContent = JSON.stringify(data, null, 2);
        }

        async function getSessions() {
          const res = await fetch('/sessions');
          const data = await res.json();
          show(data);
        }

        async function createSession() {
          const res = await fetch('/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: document.getElementById('title').value,
              date: document.getElementById('date').value,
              location: document.getElementById('location').value,
              attendance: Number(document.getElementById('attendance').value)
            })
          });

          const data = await res.json();
          show(data);
        }

        async function updateSession() {
          const id = document.getElementById('updateId').value;

          const res = await fetch('/sessions/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              attendance: Number(document.getElementById('updateAttendance').value)
            })
          });

          const data = await res.json();
          show(data);
        }

        async function deleteSession() {
          const id = document.getElementById('deleteId').value;

          const res = await fetch('/sessions/' + id, {
            method: 'DELETE'
          });

          const data = await res.json();
          show(data);
        }
      </script>
    </body>
    </html>
  `);
});

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
  location: req.body.location,
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