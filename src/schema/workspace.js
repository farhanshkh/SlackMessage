import mongoose from 'mongoose';

const workspaceschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'workspace is required'],
    unique: true
  },
  description: {
    type: String
  },
  member: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      }
    }
  ],
  joincode: {
    type: String,
    required: [true, 'join code is required']
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ]
});

const Workspace = mongoose.model('Workspace', workspaceschema);

export default Workspace;
