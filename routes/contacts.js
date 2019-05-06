var express = require("express");
var router = express.Router();
let {
  getAllContacts,
  getSingleContact,
  createContact,
  createContactExcel,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

/* GET all contacts */
router.get("/", getAllContacts);

/* GET single contact */
router.get("/:id", getSingleContact);

/* POST contact or create new contact */
router.post("/excel", createContactExcel);
router.post("/", createContact);

/* PUT contact or update contact */
router.put("/:id", updateContact);

/* DELETE contact */
router.delete("/:id", deleteContact);

module.exports = router;
