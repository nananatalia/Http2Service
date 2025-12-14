import jwt from 'jsonwebtoken';
import pool from '../config/db.js';


// Middleware chroniący trasy wymagające uwierzytelnienia
export const protect = async (req, res, next) => {    // next pozwala przejść do następnego middleware lub endpointu
    try {
        const token = req.cookies.token;    // dostęp do ciasteczek przez req.cookies dzięki cookie-parser

        if (!token) { // jeśli brak tokena, zwracamy błąd 401 Unauthorized
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // jęsli token istnieje, weryfikujemy go
        const decoded = jwt.verify(token, process.env.JWT_SECRET);   // zwraca payload tokena jeśli jest poprawny

        // pobieramy zdekodowane dane uzytkownika z bazy danych bez hasla
        const user = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [decoded.id]);

        if (user.rows.length === 0) {    // jeśli uzytkownik nie istnieje, zwracamy błąd
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user.rows[0];    // jeśli uzytkownik istnieje, dodajemy jego dane do obiektu req
        next();  // przechodzimy do następnego middleware lub endpointu

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}