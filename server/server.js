const express = require('express');
const app = express();
const chat = require('./chat');

app.use(express.json());

const server = app.listen('3001', () => {
  console.log('Server running on http://localhost:3001');
});

chat(server);
