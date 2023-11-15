const express = require('express');
const shortId = require('shortid');
const createHTTP = require('http-errors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
const link = 'mongodb+srv://hubertmichaelseelan:oZYACDmZlKoaNTxN@cluster0.ez66ddl.mongodb.net/?retryWrites=true&w=majority';
const ShortUrl = require('./models/urlmodel');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(4000, () => console.log('Running 🌏 on port 4000'));

app.get('/', async (req, res) => {
  res.send({ res: 'server is started' });
});

mongoose
  .connect(link)
  .then(() => {
    console.log('Database is Connected');
  })
  .catch((error) => console.log(error));

app.post('/shorturl', async (req, res) => {
  const { url } = req.body;
  try {
    const newURL = new ShortUrl({
      longURL: url,
    });
    await newURL.save();
    res.json({ shortURL: `http://localhost:4000/${newURL.shortCode}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/:shortCode', async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const url = await ShortUrl.findOne({ shortCode });
    if (url) {
      res.redirect(url.longURL);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
