import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import fs from 'fs';
import path from 'path';

const app = express();

// ✅ Updated CORS setup
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

app.use('/api', apiRoutes);

// ✅ NEW: Serve sitemap.xml directly from backend (no script injection)
app.get('/sitemap.xml', (req, res) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tempmailpk.com/</loc>
    <lastmod>2025-11-16</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tempmailpk.com/app</loc>
    <lastmod>2025-11-16</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tempmailpk.com/blog/tech-behind-disposable-emails</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tempmailpk.com/blog/receive-sms-otp-online</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tempmailpk.com/blog/private-domains-temp-email</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tempmailpk.com/blog/burner-email-for-social-media</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemapContent);
});

app.get('/', (req, res) => {
    res.send('Temp Mail Pro Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
