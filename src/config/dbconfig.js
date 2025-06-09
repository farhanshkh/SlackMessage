import mongoose from 'mongoose';

import { DB_URL_DEV, DB_URL_PROD, NODE_ENV } from './serverconfig.js';

export async function dbconnect() {
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(DB_URL_DEV);
    } else if (NODE_ENV === 'Production') {
      await mongoose.connect(DB_URL_PROD);
    }
    console.log(`Db connected on ${NODE_ENV} Environment`);
  } catch (error) {
    console.log('something went wrong on connection', error);
  }
}
