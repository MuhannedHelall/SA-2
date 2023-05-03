const Customer = require("../models/Customer");

exports.getAllCustomers = (req, res, next) => {
  Customer.findAll()
    .then((customers) => res.status(200).json({ customers: customers }))
    .catch((err) => console.log(err));
};

exports.getCustomer = (req, res, next) => {
  const id = req.params.id;
  Customer.findByPk(id)
    .then((customer) => {
      if (!customer)
        return res.status(404).json({ err: "Customer not found!" });
      res.status(200).json({ customer: customer });
    })
    .catch((err) => console.log(err));
};

exports.createCustomer = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  Customer.create({ name: name, email: email, password: password })
    .then((result) =>
      res.status(201).json({ message: "Customer Created !", customer: result })
    )
    .catch((err) => console.log(err));
};

exports.updateCustomer = (req, res, next) => {
  const id = req.params.id;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedpassword = req.body.password;
  Customer.findByPk(id)
    .then((customer) => {
      if (!customer)
        return res.status(404).json({ message: "Customer not found!" });

      customer.name = updatedName;
      customer.email = updatedEmail;
      customer.password = updatedpassword;
      return customer.save();
    })
    .then((result) =>
      res.status(200).json({ message: "Customer Updated!", customer: result })
    )
    .catch((err) => console.log(err));
};

exports.deleteCustomer = (req, res, next) => {
  const id = req.params.id;
  Customer.findByPk(id)
    .then((customer) => {
      if (!customer)
        return res.status(404).json({ message: "Customer not found!" });
      return Customer.destroy({ where: { id: id } });
    })
    .then((result) => res.status(200).json({ message: "Customer Deleted!" }))
    .catch((err) => console.log(err));
};
