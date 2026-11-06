const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
