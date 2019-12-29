const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {AuthCheck, SanitizeUser} = require('../helpers/global/auth');
const AuthToken = require('../models/authtokens.js');

// Controllers
const local_auth = require('../controllers/local_auth');
const refresh_token = require('../controllers/refresh_token');

serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

/********************
 * Logout
 * Params: {refreshToken} + Authorization
 * Accepts: JSON
********************/
router.post('/logout', [AuthCheck, local_auth.logout]);

/********************
 * Refresh Token
 * Params: {refreshToken}
 * Accepts: JSON
********************/
router.post('/refresh', refresh_token.init);

/********************
 * Local Strategy Login
 * Params: {email, password}
 * Accepts: JSON
********************/
router.post('/login', passport.authenticate('local'), local_auth.login);

/********************
 * Register
 * Params: {email, confirm_email, password, confirm_password. first_name, last_name}
 * Accepts: JSON
********************/
router.post('/register', local_auth.register);

//Auth with google
router.get('/google', passport.authenticate('google', {
  scope: (env.GOOGLE_SCOPE).split(","),
  accessType: 'offline',
  prompt: 'consent'
}));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  var user = req.user;
  let new_user = SanitizeUser(user);
  const accessToken = jwt.sign({new_user}, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRE_TIME });
  generate_token(new_user, accessToken, res);
});

//Auth with github
router.get('/github', passport.authenticate('github', {
  scope: (env.GITHUB_SCOPE).split(",")
}));
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  var user = req.user;
  let new_user = SanitizeUser(user);
  const accessToken = jwt.sign({new_user}, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRE_TIME });
  generate_token(new_user, accessToken, res);
});

var generate_token = (user, accessToken, res)=>{
  AuthToken.findOne({
      user_id: user._id
  },
  (err, data)=>{
      if(data){
          //Token Exist
          res.status(200).json({
              accessToken, 
              refresh_token: data.refresh_token
          });
      } else {
          const refreshToken = jwt.sign({user}, env.JWT_REFRESH_SECRET);
          var new_token = new AuthToken({
              user_id: user.id,
              refresh_token: refreshToken
          });

          new_token.save((err, new_t)=>{
              if(err){
                  res.status(401).json({
                      error_message:'Error Saving Token To DB',
                      err
                  });
              } else {
                  //New Token Created
                  res.status(200).json({
                      accessToken, 
                      refresh_token: new_t.refresh_token
                  });
              }
          });

      }
  });
}

module.exports = router;
