const validateLogin = (req, res, next) => {
    if (req.session.username) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
};

module.exports = { validateLogin }