var express = require('express');
var router = express.Router();
var authHeader = require("../helpers/global/auth");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign in - Netdevv Accounts'});
});
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Sign in - Netdevv Accounts'});
});
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Create your Netdevv Accounts'});
});

router.post('/test', authHeader, function(req, res, next) {
  res.json("Success");
});

module.exports = router;
