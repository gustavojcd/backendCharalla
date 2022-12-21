const passport = require('passport')

const passportOptions = { badRequestMessage: 'falta username / password' }

const signUp = (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) return res.status(401).json(info);
        res.json({ msg: 'signup OK' })
    })(req, res, next);
}

const login = (req, res) => {
    res.json({ msg: 'welcome!', user: req.user })
}
const getHome = (req, res) => {
    res.json(req.session)
}
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) res.send('logout ok')
        else res.send({ status: 'logout ERROR', body: err })
    })
}

module.exports = {
    signUp,
    login,
    getHome,
    logout
}