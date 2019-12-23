var express = require('express');
var router = express.Router();
var authHeader = require("../helpers/global/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Netdevv API', env_test: env.APP_DESCRIPTION });
});

router.post('/test', authHeader, function(req, res, next) {
  res.json("Success");
});

module.exports = router;
