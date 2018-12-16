const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../database/index');
const github = require('../helpers/github');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.post('/repos', (req, res) => {
  github.getReposByUsername(req.body, (error, repos) => {
    if (error) {
      res.status(404);
      res.send();
    } else {
      if (!Array.isArray(repos) && repos.message === 'Not Found') return;
      db.save(repos)
        .then(() => res.send());
    }
  });
});

app.get('/repos', (req, res) => {
  db.findSpecifiedNumber(25, (err, repos) => {
    if (err) {
      res.status(404);
      res.send();
    } else {
      console.log(repos);
      res.send(repos);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});