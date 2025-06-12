import Channel from '../schema/channel.js';
import crudrepositories from './crudrepositories.js';

const channelrepositories = {
  ...crudrepositories(Channel)
};


export default channelrepositories;
