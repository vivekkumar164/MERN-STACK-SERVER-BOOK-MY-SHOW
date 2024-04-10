const express = require('express');
require('dotenv').config();
const dbConfig = require('./config/dbConfig')

const userRouter = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoutes')

const app = express();

const PORT = 8080;

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);


app.listen(PORT , ()=>{
    console.log(`server running at port ${PORT}`);
})