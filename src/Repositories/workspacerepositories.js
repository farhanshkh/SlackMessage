import { StatusCodes } from 'http-status-codes';

import User from '../schema/users.js';
import Workspace from '../schema/workspace.js';
import ClientError from '../utils/errors/Clienterror.js';
import channelrepositories from './channelrepositories.js';
import crudrepositories from './crudrepositories.js';

const workspacerepositories = {
  ...crudrepositories(Workspace),
  getworkspacedetailsbyid: async function (workspaceid) {
    const response = await Workspace.findById(workspaceid)
      .populate('member.memberId', 'username email avatar')
      .populate('channels');

    return response;
  },
  getworkspacebyname: async function (workspacename) {
    const workspace = await Workspace.findOne({ name: workspacename });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace send from clinet side',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  getworkspacebyjoincode: async function (joincode) {
    const workspace = await Workspace.findOne({ joincode });
    console.log('repos of fetching data from repos', workspace);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace send from clinet side',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  addmemebertoworkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);
    console.log(`workspace `, workspace);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace send from clinet side',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isvaliduser = await User.findById(memberId);
    console.log(`isvaliduser`, isvaliduser);

    if (!isvaliduser) {
      throw new ClientError({
        explanation: 'Invalid workspace sent from clinet',
        message: 'Member not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    //need to check is member is already part of memeber for that we can use

    const isMemberAlreadyPartOfWorkspace = workspace.member.find(
      (member) => member.memberId == memberId
    );

    // console.log('ismember', isMemberAlreadyPartOfWorkspace);
    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid workspace sent from clinet',
        message: 'Workspace not ',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    workspace.member.push({
      memberId,
      role
    });
    // alternative of this you can use workspace by id using $push which is mongoose feture to add in array
    // for reference you can search

    await workspace.save();
    return workspace;
  },
  addchanneltoworkspace: async function (workspaceId, channelname) {
    const workspace =
      await Workspace.findById(workspaceId).populate('channels');
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace sent from clinet',
        message: 'Workspace not found ',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isChannelAlreadyPartofWorkSpace = workspace.channels.find(
      (channel) => channel === channelname
    );

    console.log(
      'value of ischannelareaypresent',
      isChannelAlreadyPartofWorkSpace
    );

    if (isChannelAlreadyPartofWorkSpace) {
      throw new ClientError({
        explanation: 'Invalid workspace sent from clinet',
        message: 'Channel is already present',
        statusCode: StatusCodes.FORBIDDEN
      });
    }
    const creatchannel = await channelrepositories.create({
      name: channelname
    });

    workspace.channels.push(creatchannel);
    await workspace.save();
    return workspace;
  },
  fetchallworkspacebymemberid: async function (memberId) {
    const workspace = await Workspace.find({
      'member.memberId': memberId
    }).populate('member.memberId', 'username email avatar');
    return workspace;
  }
};

export default workspacerepositories;
