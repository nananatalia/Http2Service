import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

// Tworzysz nowe polaczenie z baza danych
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

// Eksportujesz polaczenie, zeby moc go uzyc w innych plikach
pool.on("connect", () => {
    console.log("Connected to databse");
})

pool.on("error", (err) => {
    console.log("Database conncetion error.")
})

export default pool;