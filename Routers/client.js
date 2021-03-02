const router = require('express').Router();
const moment = require('moment');
const { v4: uuid } = require('uuid');
const { ajv, bcrypt, models } = require('../Functions');

router.post('/signup', (req, res) => {
  const valid = ajv.validateSignup(req.body);
  if (valid === null) {
    models.users.findOne({
      username: req.body.username,
    }).then((user) => {
      if (!user) {
        new models.users({
          avatar: {
            body: {
              color: '#ffffff',
            },
            eye: {
              color: '#ff4500',
            },
          },
          cakeDay: new Date(req.body.cakeDay),
          coins: 0,
          followers: [],
          following: [],
          id: uuid(),
          karma: 0,
          password: bcrypt.generate(req.body.password),
          premium: {
            isPremium: false,
            date: null,
          },
          roles: [],
          comments: [],
          username: req.body.username,
        }).save().then((newAccount) => {
          req.session.username = req.body.username;
          res.status(201).json({
            status: 201,
            message: 'Account created successfully',
            user: {
              username: req.body.username,
              id: newAccount.id,
              avatar: {
                body: {
                  color: '#ffffff',
                },
                eye: {
                  color: '#ff4500',
                },
              },
              cakeDay: req.body.cakeDay,
            },
          });
        }).catch((err) => {
          console.error(err);
          res.status(500).json({
            status: 500,
            message: 'An unknown error occured, we will investigate it as soon as possible',
          });
        });
      } else {
        res.status(403).json({
          status: 403,
          message: `An account with an email of: ${req.body.email} already exsists`,
        });
      }
    });
  } else {
    res.status(403).send({ status: 403, message: 'Invalid request body', reason: valid });
  }
});

router.post('/login', (req, res) => {
  const valid = ajv.validateLogin(req.body);
  if (req.session && req.session.user !== null && req.session.user !== undefined) {
    res.redirect(301, (req.query.redirectTo || '/'));
  } else if (valid === null) {
    models.users.findOne({
      username: req.body.username,
    }, {
      _id: 0,
    }, async (err, user) => {
      if (user) {
        if (bcrypt.compare(req.body.password, user.password)) {
          req.session.user = {
            id: user.id,
            username: user.username,
          };
          res.redirect(301, (req.query.redirectTo || '/'));
        } else {
          res.status(400).send('Incorrect username or password.');
        }
      } else {
        res.status(400).send('Incorrect username or password.');
      }
    });
  } else {
    res.status(403).send({ status: 403, message: 'Invalid request body', reason: valid });
  }
});

router.get('/whoami', (req, res) => {
  if (req.session && req.session.user.id !== null && req.session.user.id !== undefined) {
    res.send(`Logged in as: ${req.session.user.username}`);
  } else {
    res.send('Currently not logged in');
  }
});

router.get('/', (req, res) => {
  if (req.session && req.session.user.id !== null && req.session.user.id !== undefined) {
    res.send(`Logged in as: ${req.session.user.username}\nThis is not the front page of the internet.`);
  } else {
    res.send('Currently not logged in');
  }
});

module.exports = router;
