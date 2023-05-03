const Offer = require("../models/Offer");

exports.getAllOffers = (req, res, next) => {
  Offer.findAll()
    .then((offers) => res.status(200).json({ offers: offers }))
    .catch((err) => console.log(err));
};

exports.getOffer = (req, res, next) => {
  const id = req.params.id;
  Offer.findByPk(id)
    .then((offer) => {
      if (!offer) return res.status(404).json({ err: "Offer not found!" });
      res.status(200).json({ offer: offer });
    })
    .catch((err) => console.log(err));
};

exports.deleteOffer = (req, res, next) => {
  const id = req.params.id;
  Offer.findByPk(id)
    .then((offer) => {
      if (!offer) return res.status(404).json({ message: "Offer not found!" });
      return offer.destroy({ where: { id: id } });
    })
    .then((result) => res.status(200).json({ message: "Offer Deleted!" }))
    .catch((err) => console.log(err));
};

exports.createOffer = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const endDate = req.body.endDate;
  const isDeleted = req.body.isDeleted;
  Offer.create({ name: name, endDate: endDate, price: price, isDeleted: isDeleted })
    .then((result) =>
      res.status(201).json({ message: "Offer Created !", offer: result })
    )
    .catch((err) => console.log(err));
};
