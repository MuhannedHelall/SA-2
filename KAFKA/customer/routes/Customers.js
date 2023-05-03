const Customer = require("../controllers/Customers");
const router = require("express").Router();

router.get("/", Customer.getAllCustomers);
router.get("/:id", Customer.getCustomer);
router.post("/", Customer.createCustomer);
router.put("/:id", Customer.updateCustomer);
router.delete("/:id", Customer.deleteCustomer);

module.exports = router;
