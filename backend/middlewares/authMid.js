const jwt = require('jsonwebtoken')
const protectedRoute = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" , error: error.message})
    }
}

module.exports = {protectedRoute}
