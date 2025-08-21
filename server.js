import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';

const app = express();
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://temp-mail-pro-frontend.vercel.app',
        'https://your-custom-domain.com'
    ]
}));


app.use(express.json());
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.send('Temp Mail Pro Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));