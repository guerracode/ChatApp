const express = require('express');
const app = express();
const chat = require('./chat');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

chat(server);
