require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const userRoutes = require('./src/routes/userRoutes');
const mediaRoutes = require('./src/routes/mediaRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/medias', mediaRoutes);
app.use(errorHandler);

async function start() {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required');
    await connectDB();
    await User.init();
    app.listen(process.env.PORT, () => console.log('Server running on port', process.env.PORT));
}
start().catch(error => { console.error(error.message); process.exit(1); });
