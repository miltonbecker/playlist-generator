const express = require('express');
const path = require('path');

const app = express();

const distPath = path.join(__dirname, '../../dist');

app.use(express.static(distPath));

app.listen('9999', () => {
  console.log('Listening on port 9999');
});
