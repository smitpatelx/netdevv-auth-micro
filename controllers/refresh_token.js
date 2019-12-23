const jwt = require('jsonwebtoken');
const AuthToken = require('../models/authtokens.js');

let refresh_token = {};

refresh_token.init = (req, res, next)=>{
    const refreshToken = req.body.refresh_token;
    if(typeof refreshToken !== 'undefined'){
        AuthToken.findOne({
            refresh_token: refreshToken
        }, (err, data)=>{
            if(data){
                jwt.verify(refreshToken, env.JWT_REFRESH_SECRET, (err, data)=>{
                    if(err != null) return res.status(403).json(err);
                    //Create New Access Token
                    var accessToken = jwt.sign(data.user, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRE_TIME });
                    res.status(200).json({accessToken});
                });
            } else {
                //Token Doesn't Exist In DB
                return res.status(403).json({ error_message:"Refresh Token Doesn't Match", err});
            }
        });

    } else {
        return res.status(401).json("Access Denied - Refresh Token not present");
    }
    
}

module.exports = refresh_token;