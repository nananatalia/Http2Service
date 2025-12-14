import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';


dotenv.config();

const app = express();

// Middlewares
app.use(cors({  // słjży do zezwalania na zapytania z innych domen
    origin: process.env.CLIENT_URL || "http://localhost:5173",   // zezwalamy na zapytania tylko z tego adresu
    credentials: true    // zezwalamy na wysylanie ciasteczek
}));
app.use(express.json());    // Zeby serwer rozumial json w ciele zapytania (req.body w serwerze)
app.use(cookieParser());    // Zeby moc czytac ciasteczka

/*app.get("/", (req, res) => {
    res.send("Hello działamy!");
})*/

app.use('/api/auth', authRoutes);    // wszystkie trasy z authRoutes beda mialy prefiks /api/auth

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})