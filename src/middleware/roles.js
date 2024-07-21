module.exports = (roles) => {
    
    return (req, res, next) => {
        console.log('dataa', req.body.roleData)
        if (!roles.includes(req.body.roleData || req.params.roleData)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};