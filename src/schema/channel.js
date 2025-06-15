import mongoose from 'mongoose';

const channelschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel is required']
    },
    workspaceid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
    }
  },
  { timestamps: true }
);

const Channel = mongoose.model('Channel', channelschema);

export default Channel;
