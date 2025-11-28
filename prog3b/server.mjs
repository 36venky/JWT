import express from 'express';
import connectDB from './db.mjs';
import userRoutes from './routes/userRoutes.mjs';

const app = express();
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log("Server running on port 5000..."));

export default app;