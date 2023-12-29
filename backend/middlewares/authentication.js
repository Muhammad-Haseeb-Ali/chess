const jwt = require('jsonwebtoken')

const authentication = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({msg: "User is not Authenticated"})
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data)=>{
        if(err) return res.status(401).json({msg: "User is not Authenticated"})
        res.locals.token = data
        next()
    });        

}

module.exports = authentication