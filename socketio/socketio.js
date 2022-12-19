/** @format */

const models = require("./models");

module.exports = {
  ADD_MESSAGE: async (data) => {
    const session = await models.Session.findOne({ _id: data.session });
    const conversation = await models.Conversation.findOne({
      _id: data.conversation,
    });
    const newMessage = new models.Message({
      text: data.content,
      creator: session._id,
      conversation: conversation._id,
    });

    const returned = await newMessage.save();

    return returned;
  },
  DELETE_MESSAGE: async (data) => {
    const deleteMessage = await models.Message.deleteOne({ _id: data.id });

    return deleteMessage;
  },
  GET_MESSAGES: async (data) => {
    return await models.Message.find({ conversation: data })
      .populate("creator")
      .sort("timestamp");
  },
  GET_ROOM: async (data) => {
    return await models.Conversation.findById(data);
  },
};
