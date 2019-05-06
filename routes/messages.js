var express = require("express");
var router = express.Router();
let {
  getAllMessages,
  createMessage
} = require("../controllers/messageController");

/* GET all contacts */
router.get("/", getAllMessages);

/* POST contact or create new message */
router.post("/", createMessage);

module.exports = router;
