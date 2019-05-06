const Op = require("sequelize").Op;
const { Message, Contact } = require("../models");

exports.getAllMessages = (req, res) => {
  /*
   * Get /api/v1/messages
   * Get all message
   */

  Message.findAll({ include: [{ model: Contact }] })
    .then(messages => {
      res
        .status(200)
        .json({ message: "Success read all messages", data: messages });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: " Internal server error" });
    });
};

exports.createMessage = (req, res) => {
  /*
   * POST /api/v1/message
   * Insert message
   */

  let newMessage = ({ message, ContactId } = req.body);

  Message.create(newMessage)
    .then(message => {
      res
        .status(201)
        .json({ message: "Success create new message", data: message });
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
};
