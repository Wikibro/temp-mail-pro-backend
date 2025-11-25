import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';

const app = express();

// ✅ CORS setup
const allowedOrigins = [
    'http://localhost:3000',
    'https://temp-mail-pro-frontend.vercel.app',
    'https://tempmailpk.vercel.app',
    'https://tempmailpk.com'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// ✅ Serve static files from public directory only
app.use(express.static('public'));

// ✅ API routes
app.use('/api', apiRoutes);

// ✅ Health check
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Temp Mail Pro Backend'
    });
});

// ✅ Root route
app.get('/', (req, res) => {
    res.send('Temp Mail Pro Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
