import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRouter from './routes/analyze.js';
// Load environment variables
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// Enable CORS so the React frontend can talk to the server
app.use(cors());
// Basic JSON and URL-encoded body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Register API routes
app.use('/api', analyzeRouter);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date() });
});
// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'An unexpected error occurred on the server',
    });
});
app.listen(port, () => {
    console.log(`[Server] Mira AI Backend running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map