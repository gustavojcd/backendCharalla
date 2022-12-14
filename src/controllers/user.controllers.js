const users = [
  {
    username: 'gustavo'
  },
  {
    username: 'joel'
  }
]

const login = (req, res) => {
  const { username } = req.body;

  const index = users.findIndex((aUser) => aUser.username === username);

  if (index < 0)
    res.status(401).json({ msg: 'no estas autorizado' });
  else {
    req.session.username = username;
    res.json({ msg: 'Bienvenido!!' })
  }
}

const logout = (req, res) => {
  const nombre = req.session?.username;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) res.send('logout ok!');
      else res.send({ status: 'logout ERROR', body: err });
    });
  }
}

module.exports = { login, logout }