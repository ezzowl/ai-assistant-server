const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const tasks = {}; // временное хранилище

app.post('/add-task', (req, res) => {
  const { userId, text } = req.body;

  if (!tasks[userId]) tasks[userId] = [];

  tasks[userId].push({
    id: Date.now(),
    text
  });

  res.json({ success: true });
});

app.get('/tasks/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(tasks[userId] || []);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on Render');
});
