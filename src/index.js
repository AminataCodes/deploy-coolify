import express from 'express';
import 'dotenv/config';
import userRouters from '../src/routes/user-route.js';
import authRouters from '../src/routes/auth-route.js';
import movieRouters from '../src/routes/movie-route.js'
import registerRouter from '../src/routes/register-route.js'
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js'
 
const PORT = 3000;
const app=express();

app.use (morgan("dev"));
app.use(express.json());
app.get('/',(req,res) =>{
    res.json({
        message:'Welcome to HETIC users management !!'
    });
});


app.use ("/api/users", userRouters)
app.use ("/api/auth", authRouters)
app.use ("/api/movies", movieRouters)
app.use ("/api/register", registerRouter)
app.use(errorHandler);

 app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
 });

