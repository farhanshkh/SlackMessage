import mongoose from 'mongoose';

const messageschema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'message is required']
    },
    image: {
      type: String
    },
    ChannelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: [true, 'channel id is required']
    },
    SenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender id required']
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: [true, 'workspaceid is required']
    }
  },
  { timestamps: true }
);

const message = mongoose.model('message', messageschema);
export default message;
