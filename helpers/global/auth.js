const jwt = require('jsonwebtoken');

module.exports.AuthCheck = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if(typeof authHeader !== 'undefined'){
        const token = authHeader.split(" ")[1];
        if(token == null) return res.status(401).json("Access Denied - Token not present");
        jwt.verify(token, env.JWT_SECRET, (err, user)=>{
            if(err){
                return res.status(403).json(err);
            } else {
                next();
            }
        });
    } else {
        return res.status(401).json("Access Denied - Token not present");
    }
}

module.exports.SanitizeUser = (user)=>{
    let new_data = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        access: user.access,
        primary_email: user.primary_email
    }
    return new_data;
}