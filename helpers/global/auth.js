const jwt = require('jsonwebtoken');

module.exports = authToken = (req, res, next)=>{
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
