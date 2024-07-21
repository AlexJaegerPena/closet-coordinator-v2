import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import crypto from 'crypto';
// console.log(crypto.randomBytes(32).toString('base64'));

// DB
import DB from './db/dbConnection.js';
// Routes
import imageRoutes from './routes/imageRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';

// middlewares
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }), express.json());
const PORT = process.env.PORT;
DB();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/users`, usersRoutes);
app.use(`/api/v1/images`, imageRoutes);
app.use(`*`, (req, res) =>
  res.status(404).json({ message: 'Page not found!' })
);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
