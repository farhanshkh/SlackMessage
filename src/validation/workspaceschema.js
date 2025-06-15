import { z } from 'zod';

export const workspaceschema = z.object({
  name: z.string().min(3).max(50)
});

export const addmemberschema = z.object({
  memberId: z.string()
});

export const addchannelshema = z.object({
  channelname: z.string()
});
