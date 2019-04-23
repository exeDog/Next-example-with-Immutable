const path = require('path');
const express = require('express');
const LocalStorage = require('node-localstorage').LocalStorage;
const bodyParser = require('body-parser');
const merge = require('merge-deep');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 1337;
const localStorage = new LocalStorage(path.join(__dirname, 'fakeDB'));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const getDataOrReject = (req, res) => {
  const data = localStorage.getItem(req.params.id);

  if (!data) return res.status(404).send({ error: true, message: 'User was not found.' });

  return JSON.parse(data);
};

// USER
app.route('/user/:id')
  .get((req, res) => {
    const data = getDataOrReject(req, res);

    // res.headersSent would be true if getDataOrReject responded with 404 already.
    if (res.headersSent) return;

    res.send(data);
  })
  .post((req, res) => {
    if (!req.params.id || !req.body.settings) {
      return res.status(400).send({
        error: true,
        message: 'Did not receive `id` or `settings`.',
      });
    }

    const payload = {
      id: req.params.id,
      settings: req.body.settings,
      favorites: [],
    };

    localStorage.setItem(req.params.id, JSON.stringify(payload));

    res.send(payload);
  })
  .delete((req, res) => {
    getDataOrReject(req, res);

    if (res.headersSent) return;

    localStorage.removeItem(req.params.id);

    res.send();
  });

// FAVORITES
app.route('/user/:id/favorites/')
  .patch((req, res) => {
    const data = getDataOrReject(req, res);

    if (res.headersSent) return;

    if (!req.body.operation || !req.body.values) {
      return res.status(400).send({
        error: true,
        message: 'Did not receive `values` or `operation`.',
      });
    }

    const stringValues = req.body.values.map(a => JSON.stringify(a));

    if (req.body.operation === 'remove') {
      data.favorites = data.favorites.map(a => JSON.stringify(a))
        .filter(a => stringValues.indexOf(a) === -1)
        .map(a => JSON.parse(a));
    } else if (req.body.operation === 'add') {
      const existing = data.favorites.map(a => JSON.stringify(a));
      stringValues.forEach((val) => {
        if (!existing.includes(val)) {
          existing.push(val);
        }
      });
      data.favorites = existing.map(a => JSON.parse(a));
    } else {
      return res.status(400).send({
        error: true,
        message: '`operation` must be either `add` or `remove`.',
      });
    }

    localStorage.setItem(req.params.id, JSON.stringify(data));

    res.send();
  });

// SETTINGS
app.route('/user/:id/settings/')
  .patch((req, res) => {
    const data = getDataOrReject(req, res);

    if (res.headersSent) return;

    if (!req.body.operation || !req.body.payload) {
      return res.status(400).send({
        error: true,
        message: 'Did not receive `payload` or `operation`.',
      });
    }

    // Deletes only top level keys
    if (req.body.operation === 'remove') {
      Object.keys(req.body.payload).forEach((key) => {
        delete data.settings[key];
      });
    } else if (req.body.operation === 'update') {
      data.settings = merge(data.settings, req.body.payload);
    } else {
      return res.status(400).send({
        error: true,
        message: '`operation` must be either `update` or `remove`.',
      });
    }

    localStorage.setItem(req.params.id, JSON.stringify(data));

    res.send();
  });

app.get('/', (req, res) => res.redirect('/index.html'));


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on ${port}`)); // eslint-disable-line
}

module.exports = { app, localStorage, port };
