import express from 'express';

import { dbconnect } from './config/dbconfig.js';
import { port } from './config/serverconfig.js';
import apirouter from './routers/apiroute.js';

const app = express();
// console.log(express);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apirouter);

// app.get('/ping', (req, res) => {
//   return res.status(StatusCodes.OK).json({ message: 'H' });
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  dbconnect();
});
