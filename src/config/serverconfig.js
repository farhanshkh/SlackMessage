import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;

export const NODE_ENV = process.Node_ENV || 'development';
export const DB_URL_DEV = process.env.DEV_DB_URl;
export const DB_URL_PROD = process.env.PROD_DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';
console.log(JWT_SECRET);
console.log(JWT_EXPIRY);
