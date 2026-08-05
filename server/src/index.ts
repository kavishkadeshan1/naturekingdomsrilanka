import express from 'express';
import cors from 'cors';
import inquiryRoutes from './routes/inquiries';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/inquiries', inquiryRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Nature Kingdom API is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🌿 Nature Kingdom API Server running on http://localhost:${PORT}`);
});

export default app;
