const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const initDb = require('./models/initDb');

const app = express();

initDb()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', routes);

app.use('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
