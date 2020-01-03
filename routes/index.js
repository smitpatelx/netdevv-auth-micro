var express = require('express');
var router = express.Router();
var {AuthCheck} = require("../helpers/global/auth");
const jwt = require('jsonwebtoken');

router.get('/*', (req, res, next)=>{
  let csrf_token = req.csrfToken();
  res.render('index', 
  { 
    csrf: csrf_token
  });
});

router.post('/user', AuthCheck, (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  if(typeof authHeader !== 'undefined'){
    const token = authHeader.split(" ")[1];
    if(token == null) return res.status(401).json("Access Denied - Token not present");
    jwt.verify(token, env.JWT_SECRET, (err, data)=>{
      if(err){
          return res.status(403).json(err);
      } else {
        res.status(200).json(data.new_user);
      }
    });
  } else {
    return res.status(401).json("Access Denied - Token not present");
  }
});

module.exports = router;
