"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      message: DataTypes.STRING,
      ContactId: DataTypes.INTEGER
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(sequelize.models.Contact, {
      foreignKey: "ContactId"
    });
  };
  return Message;
};
