const jwt = require('jsonwebtoken');
const secret = 'jwt-secret-key';

module.exports = async (req, res, next) => {
    const authHeader = req. headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, secret);
        // req.user = await Users.findByPk(decoded.id);
        // compare decoded values with user table data
        next();
    } catch (err) {
        res.status(403).send('Invalid token');
    }
};
