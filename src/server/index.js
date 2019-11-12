const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const getToken = require('./helpers/getToken');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/token', async (req, res) => {
  const { access_token } = await getToken();
  res.json({ token: access_token });
});

app.listen(9998, () => {
  console.log('Listening on port 9998...');
});
