import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRoutes from './routes/categoriesRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';
import customerRoutes from './routes/customersRoutes.js'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customerRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));