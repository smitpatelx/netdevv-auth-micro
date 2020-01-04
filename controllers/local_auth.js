const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user.js');
const AuthToken = require('../models/authtokens.js');
const {SanitizeUser} = require('../helpers/global/auth');

let local_auth = {};

local_auth.login = (req, res, next)=>{
    var user = req.user;
    let new_user = SanitizeUser(user);
    const accessToken = jwt.sign({new_user}, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRE_TIME });
    generate_token(new_user, accessToken, res)
    .then(result=>{
        res.status(200).json({result}); 
    })
    .catch(err=>{
        res.status(401).json({err});
    });
}

local_auth.register = (req, res, next)=>{
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var email = req.body.email;
    var confirm_email = req.body.confirm_email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    if(password !== confirm_password){
        res.status(401).json("Confirm Password Doesn't Match");
    }else if(email !== confirm_email){
        res.status(401).json("Confirm Email Doesn't Match");
    } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
            if(err){
                res.status(401).json({
                    error_message:'Error in bcrypt',
                    err
                });
            } else {
                User.findOne({
                    primary_email: email
                },
                (err, data)=>{
                    if(data!==null){
                        res.status(401).json({
                            error_message:'User Already Exist',
                            err
                        });  
                    } else {
                        var new_user = new User({
                            primary_email: email,
                            first_name: first_name,
                            last_name: last_name,
                            password: hash
                        });

                        new_user.save((err, data2)=>{
                            if(err){
                                res.status(401).json({
                                    error_message:'Error Creating User',
                                    err
                                });
                            } else {
                                let new_user = SanitizeUser(data2);
                                const accessToken = jwt.sign({new_user}, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRE_TIME });                            
                                generate_token(new_user, accessToken, res)
                                .then(result=>{
                                    req.login(data2, (err)=>{
                                        if ( ! err ){
                                            res.status(200).json(result)
                                        } else {
                                            //handle error
                                            res.status(401).json({
                                                error_message: 'Error Loggin In User'
                                            })
                                        }
                                    })
                                })
                                .catch(err=>{
                                    res.status(401).json({err});
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

local_auth.logout = (req, res, next)=>{
    // res.status(200).json("Logging Out");
    const refreshToken = req.body.refresh_token;
    if(typeof refreshToken !== 'undefined'){
        if(refreshToken == null) return res.status(401).json("Access Denied - Token not present");
        jwt.verify(refreshToken, env.JWT_REFRESH_SECRET, (err, data)=>{
            if(err){
                return res.status(403).json(err);
            } else {
                AuthToken.findOneAndDelete({
                    user_id: data.user._id
                },(err, data)=>{
                    if(data){
                        req.logout();
                        res.status(200).json("Refresh Token Deleted Successfully");
                    } else{
                        req.logout();
                        res.status(403).json("Already Logged Out");
                    }
                });
            }
        });
    } else {
        return res.status(401).json("Access Denied - Refresh Token not present");
    }
}

var generate_token = async (user, accessToken)=>{
    return new Promise((resolve, reject) => {   
        AuthToken.findOne({
            user_id: user._id
        },
        (err, data)=>{
            if(data){
                //Token Exist
                resolve({
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
                    if(new_t){
                        //New Token Created
                        resolve({
                            accessToken, 
                            refresh_token: new_t.refresh_token
                        });
                    } else {
                        reject({
                            error_message:'Error Saving Token To DB',
                            err
                        });
                    }
                });

            }
        });
    });
}

module.exports = local_auth;