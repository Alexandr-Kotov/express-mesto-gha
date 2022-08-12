const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе всех пользователя' }));
};

module.exports.getUser = (req, res) => {
  User.findId(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Произошла ошибка при запросе пользователя' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе пользователя' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании пользователя' }));
};
module.exports.updateMe = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при обновлении пользователя' }));
};

module.exports.updateMeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при обновлении аватара' }));
};
