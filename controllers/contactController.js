const Op = require("sequelize").Op;
const { Contact } = require("../models");
var { uploadExcell } = require("../middlewares/upload");
const xlsx = require("node-xlsx").default;

exports.getAllContacts = (req, res) => {
  /*
   * Get /api/v1/contacts
   * Get all contacts
   */

  Contact.findAll()
    .then(contacts => {
      res
        .status(200)
        .json({ message: "Success read all contacts", data: contacts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.getSingleContact = (req, res) => {
  /*
   * params : id
   * Get /api/v1/contacts/:id
   * Get single contact
   */

  let { id } = req.params;
  Contact.findOne({ where: { id: { [Op.eq]: id } } })
    .then(contact => {
      res
        .status(200)
        .json({ message: "Success read single contact", data: contact });
    })
    .catch(err => {
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.createContactExcel = async (req, res) => {
  /*
   * POST /api/v1/contacts/excel
   * Insert contact excel
   */
  uploadExcell(req, res, err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
    if (!req.file) {
      next();
    } else {
      const workSheetsFromFile = xlsx.parse(req.file.path);
      const contacts = [];
      workSheetsFromFile[0].data.forEach((data, index) => {
        if (index > 0) {
          contacts.push({
            name: data[0],
            phone_number: data[1]
          });
        }
      });
      Contact.bulkCreate(contacts, { individualHooks: true })
        .then(contact => {
          res
            .status(201)
            .json({ message: "Success create new contact", data: contact });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "Something Went Wrong"
          });
        });
    }
  });
};

exports.createContact = (req, res) => {
  /*
   * POST /api/v1/contacts
   * Insert contact
   */

  let newContact = ({ name, phone_number } = req.body);

  Contact.create(newContact)
    .then(contact => {
      res
        .status(201)
        .json({ message: "Success create new contact", data: contact });
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateContact = (req, res) => {
  /*
   * params : id
   * PUT /api/v1/contacts/:id
   * Update cantact
   */

  let { id } = req.params;
  let updateContact = ({ name, phone_number } = req.body);

  Contact.findOne({ where: { id: { [Op.eq]: id } } })
    .then(contact => {
      if (contact) {
        return contact.update(updateContact).then(updatedContacts => {
          res
            .status(200)
            .json({ message: "Sucess update contact", data: updatedContacts });
        });
      } else {
        res.status(400).json({ message: "Contact not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteContact = (req, res) => {
  /*
   * params : id
   * DELETE /api/v1/contacts/:id
   * DELETE contact
   */
  const { id } = req.params;
  Contact.findOne({ where: { id: { [Op.eq]: id } } })
    .then(contact => {
      return contact.destroy();
    })
    .then(contact => {
      res
        .status(200)
        .json({ message: "Success delete contact", data: contact });
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
};
