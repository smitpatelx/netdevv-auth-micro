const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const GoogleStrategy = require('passport-google-oauth20');
const GithubStrategy = require('passport-github2');
const LocalStrategy = require('passport-local');
const {SanitizeUser} = require('../helpers/global/auth');

const User = require('../models/user.js');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById( _id, (err, user) => {
    if(err){
        done(null, false, {error:err});
    } else {
        done(null, user);
    }
  });
});

var google = new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    var jsn_data = profile._json;
    if (!req.user) {
        if(typeof jsn_data.sub !== 'undefined'){
            User.findOne({
                google_id: jsn_data.sub
            }, (err, data)=>{
                if(data){
                    //User Already exist in database
                    done(null, data);
                } else {
                    //Create new user
                    User.create({
                        google_id: jsn_data.sub,
                        primary_email: jsn_data.email,
                        first_name: jsn_data.given_name,
                        last_name: jsn_data.family_name,
                        avatar: jsn_data.picture,
                        google_token: accessToken,
                        google_refresh_token: refreshToken
                    },
                    (err, data)=>{
                        if(err){
                            done(null, false, {error:err});
                        } else {
                            done(null, data);
                        }
                    });
                }
            });
        }
     } else {
        User.findByIdAndUpdate(
            req.user._id, 
            { 
                google_id: jsn_data.sub,
                avatar: jsn_data.picture,
                google_token: accessToken,
                google_refresh_token: refreshToken 
            }
        , {new: true}
        , (err, data)=>{
            if(err){
                done(null, false, {error:err});
            } else {
                done(null, data);
            }
        });
    }
});

passport.use(google);
refresh.use(google);

var github = new GithubStrategy({
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: env.GITHUB_CALLBACK_URL,
    scope: 'user:email',
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    var jsn_data = profile._json;
    if (!req.user) {
        if(typeof profile.id !== 'undefined'){
            var full_name = jsn_data.name;
            var fn = String(full_name).split(' ')[0];
            var ln = String(full_name).split(' ')[1];
            
            User.findOne({
                github_id: profile.id
            }, (err, data)=>{
                if(data){
                    //User Already exist in database
                    done(null, data);
                } else {
                    //Create new user
                    User.create({
                        github_id: profile.id,
                        first_name: fn,
                        last_name: ln,
                        avatar: jsn_data.avatar_url,
                        github_token: accessToken,
                        primary_email: profile.emails[0].value
                    },
                    (err, data)=>{
                        if(err){
                            done(null, false, {error:err});
                        } else {
                            done(null, data);
                        }
                    });
                }
            });
        }
    } else {
        User.findByIdAndUpdate(
            req.user._id, 
            { 
                github_id: profile.id,
                avatar: jsn_data.avatar_url,
                github_token: accessToken,
            }
            , {new: true}
            , (err, data)=>{
                if(err){
                    done(null, false, {error:err});
                } else {
                    done(null, data);
                }
        });
    }
});

passport.use(github);
refresh.use(github);

passport.use(
    new LocalStrategy({
        usernameField: 'email',
    }, (email, password, done)=>{
        if(email==null) return done(null, false, {error:"Email required"});
        if(password==null) return done(null, false, {error:"Password required"});

        User.findOne({
            primary_email: email
        },
        (err, data)=>{
            if(data==null){
                return done(null, false, {error:"Email or Password incorrect"});
            } else {
                bcrypt.compare(password, data.password, (err, result)=>{    
                    if (result == true) {
                        return done(null, data);
                    } else {
                        return done(null, false, {error:"Email or Password incorrect"});
                    }
                });
            }
        });
    }
));