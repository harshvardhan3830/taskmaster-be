import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.conf.js'; // Import the database connection function
import routes from './routes/v1/index.js';
import Route from './routes/routes.js';
// server.js - Main entry point for the Jira Clone API server

dotenv.config();

connectDB(); // Connect to MongoDB

const app = Express();
const router = Express.Router();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Welcome to the Jira Clone API');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.use('/api/v1', Route(router)); // Use the routes defined in the routes directory

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
