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

router.get('/testdata',  (req, res, next)=>{
  var dd = (env.GOOGLE_SCOPE).split(",")
  dd = JSON.stringify(dd)
  res.redirect('/linked-accounts?data='+dd)
})
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
router.get('/google', (req, res, next)=>{
  const {redirect} = req.query
  const state = redirect ? Buffer.from(JSON.stringify({ redirect })).toString('base64') : res.status(401)
  const authenticator = passport.authenticate('google', {
    scope: (env.GOOGLE_SCOPE).split(","),
    accessType: 'offline',
    prompt: 'consent',
    state
  });
  authenticator(req, res, next)
});
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  var user = req.user;
  let new_user = SanitizeUser(user);
  const accessToken = jwt.sign({new_user}, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRE_TIME });
  const {state} = req.query
  const { redirect } = JSON.parse(Buffer.from(state, 'base64').toString())
  if (typeof redirect === 'string' && redirect.toString().startsWith('/')) {
    generate_token_get(new_user, accessToken, res, redirect);
  }
});

//Auth with github
router.get('/github', (req, res, next)=>{
  const {redirect} = req.query
  const state = redirect ? Buffer.from(JSON.stringify({ redirect })).toString('base64') : res.status(401)
  const authenticator = passport.authenticate('github', {
    scope: (env.GITHUB_SCOPE).split(","),
    state
  });
  authenticator(req, res, next)
});
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  var user = req.user;
  let new_user = SanitizeUser(user);
  const accessToken = jwt.sign({new_user}, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRE_TIME });
  const { state } = req.query
  const { redirect } = JSON.parse(Buffer.from(state, 'base64').toString())
  if (typeof redirect === 'string' && redirect.toString().startsWith('/')) {
    generate_token_get(new_user, accessToken, res, redirect);
  }
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
              user_id: user._id,
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

var generate_token_get = (user, accessToken, res, redirect_uri)=>{
  AuthToken.findOne({
      user_id: user._id
  },
  (err, data)=>{
      if(data){
        //Token Exist
        if(redirect_uri==='/auth-callback'){
          let string = {
            accessToken, 
            refresh_token: data.refresh_token
          }
          string = JSON.stringify(string);
          res.redirect(redirect_uri+'?data='+string)
        } else {
          res.redirect(redirect_uri)
        }
      } else {
        const refreshToken = jwt.sign({user}, env.JWT_REFRESH_SECRET);
        var new_token = new AuthToken({
            user_id: user._id,
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
                if(redirect_uri==='/auth-callback'){
                  let string = {
                      accessToken, 
                      refresh_token: new_t.refresh_token
                  }
                  string = JSON.stringify(string);
                  res.redirect(redirect_uri+'?data='+string)
                } else {
                  res.redirect(redirect_uri)
                }
            }
        });
      }
  });
}

module.exports = router;
