import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import categoriesRoutes from './routes/categoriesRoutes.js'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//app.use(categoriesRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));