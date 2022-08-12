/* eslint-disable no-shadow */
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе всех карточек' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании карточки' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.paramis.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при удаление карточки' }));
};

module.exports.putLike = async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (card) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка при добавлении лайка' }));
  } else res.status(404).send({ message: 'Карточка не найдена' });
};

module.exports.deleteLike = async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (card) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка при удалении лайка' }));
  } else res.status(404).send({ message: 'Карточка не найдена' });
};
