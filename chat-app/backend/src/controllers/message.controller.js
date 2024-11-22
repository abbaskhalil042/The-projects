import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getuserForSidebar = async (req, res) => {
  console.log("hello from get user for sidebar");

  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("name email profile");

    return res.status(200).json(filterUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id; //currently authenticated user
    const messages = await Message.find(
      $or[
        ({
          senderId: myId,
          receverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receverId: myId,
        })
      ]
    );

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const sendMsg = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receverId } = req.params;

    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image).secure_url;
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo: realtime functionality here => socket.io

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
