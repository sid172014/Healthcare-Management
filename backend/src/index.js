const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Date fetching from the SQL Server
const { result } = require('./db/database');

const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Defining the routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

app.listen(process.env.PORT , () => {
    console.log("Server is listening at " , process.env.PORT);
});