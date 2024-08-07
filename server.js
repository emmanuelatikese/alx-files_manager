import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => console.log('Server running on port', PORT));
