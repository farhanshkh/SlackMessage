import mongoose from 'mongoose';

const channelschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel is required']
    }
  },
  { timestamps: true }
);

const Channel = mongoose.model('Channel', channelschema);

export default Channel;
