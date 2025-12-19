import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { protect } from '../middleware/auth.js';


const router = express.Router();

const cookieOptions = {
    httpOnly: true,     // Ciasteczko dostepne tylko przez HTTP, a nie przez JS
    secure: process.env.NODE_ENV === 'production',      // Wysylane tylko przez HTTPS w produkcji
    sameSite: 'Strict',     // Zapobiega atakom CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000    // Czas zycia: 30 dni
}

// Zapisuje token z id uzytkownika w ciasteczku
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// Endpoint rejestracji uzytkownika
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;     // pobieramy dane z ciala zapytania

    if (!name || !email || !password || !confirmPassword) {     // sprawdzamy czy wszystkie pola sa wypelnione
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Sprawdzamy czy hasła się zgadzają
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Sprawdzamy czy uzytkownik juz istnieje
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);   // $1 to placeholder dla pierwszego parametru w tablicy

    // Jeśli uzytkownik istnieje, zwracamy błąd
    if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'User alreadhy exists with this email.' });
    }

    // Haszujemy haslo
    const hashedPassword = await bcrypt.hash(password, 10); // 10 to salt rounds, mówi ile razy hasło ma być haszowane

    // Wstawiamy nowego uzytkownika do bazy danych
    const newUser = await pool.query(   // pool to polaczenie z baza danych, a query to metoda do wykonywania zapytan SQL
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',    // RETURNING * zwraca wstawiony rekord, $1, $2, $3 to placeholdery dla username, email, hashedPassword
        [name, email, hashedPassword]
    )

    const token = generateToken(newUser.rows[0].id);    // generujemy token z id nowego uzytkownika

    // przechowujemy token w ciasteczku
    res.cookie('token', token, cookieOptions);  // przechowuje ciasteczko o nazwie 'token' zawierającen token, klient może zostać bezpiecznie zalogowany

    return res.status(201).json({ user: newUser.rows[0] })    // zwracamy wszystkie dane nowego uzytkownika ale bez hasla
})

// Endpoint logowania uzytkownika
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    // Sprawdzamy czy wszystkie pola sa wypelnione
    if (!name || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Sprawdzamy czy uzytkownik istnieje przez jego nazwę (lub email, w nszym przypadku nazwa)
    const user = await pool.query('SELECT * FROM users WHERE name = $1', [name]);

    // Jeśli uzytkownik nie istnieje, zwracamy błąd
    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const userData = user.rows[0];    // pobieramy dane uzytkownika z wyniku zapytania

    const isMatch = await bcrypt.compare(password, userData.password);    // porownujemy haslo z ciala zapytania z haslem w bazie danych

    // Jeśli hasło nie pasuje, zwracamy błąd
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // tworzymy token JWT
    const token = generateToken(userData.id);    // generujemy token z id uzytkownika

    res.cookie('token', token, cookieOptions);  // przechowuje ciasteczko o nazwie 'token' zawierającen token, klient może zostać bezpiecznie zalogowany

    res.json({ user: { id: userData.id, name: userData.name, email: userData.email}});  // zwracamy dane uzytkownika bez hasla
})

// Endpoint pobierania danych zalogowanego uzytkownika
router.get('/me', protect, async (req, res) => {
    res.json(req.user)
    // zwraca dane zalogowanego uzytkownika na podstawie protektowanego middleware
})

// Endpoint wylogowania uzytkownika
router.post('/logout', (req, res) => {
    res.cookie('token', '', {...cookieOptions, maxAge: 1 });    // ustawia ciasteczko token na pusty string i bardzo krotki czas zycia, co skutecznie usuwa ciasteczko
    res.json({ message: 'Logged out successfully.' });
})

export default router;