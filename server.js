// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import apiRoutes from './routes/index.js';
// import fs from 'fs';
// import path from 'path';

// const app = express();

// // ✅ Updated CORS setup
// const allowedOrigins = [
//     'http://localhost:3000',
//     'https://temp-mail-pro-frontend.vercel.app',
//     'https://tempmailpk.vercel.app',
//     'https://tempmailpk.com'
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// app.use(express.json());

// app.use('/api', apiRoutes);

// app.use(express.static('public'));


// app.get('/', (req, res) => {
//     res.send('Temp Mail Pro Backend is running');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 













import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ✅ Serve static files from multiple directories
app.use(express.static('public'));
app.use(express.static('static')); // For sitemap and robots

// ✅ API routes
app.use('/api', apiRoutes);

// ✅ EXPLICIT routes for sitemap and robots (CRITICAL FIX)
app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(path.join(__dirname, 'static', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(path.join(__dirname, 'static', 'robots.txt'));
});

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
