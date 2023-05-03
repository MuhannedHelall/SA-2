const Offer = require("../controllers/Offers");
const router = require("express").Router();

router.get("/", Offer.getAllOffers);
router.get("/:id", Offer.getOffer);
router.delete("/:id", Offer.deleteOffer);

module.exports = router;
