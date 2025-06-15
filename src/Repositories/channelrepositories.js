import Channel from '../schema/channel.js';
import crudrepositories from './crudrepositories.js';

const channelrepositories = {
  ...crudrepositories(Channel),
  getchannlebyid: async function (channelid) {
    const response = await Channel.findById(channelid).populate('workspaceid');
    return response;
  }
};

export default channelrepositories;
