import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required",
    });
  }

  const newMessage = await Message.create({
    name,
    email,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
};

export const getAllMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: messages.length,
    data: messages,
  });
};

export const markMessageAsRead = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  message.isRead = true;
  await message.save();

  res.json({
    success: true,
    message: "Message marked as read",
    data: message,
  });
};

export const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  await Message.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Message deleted successfully",
  });
};
