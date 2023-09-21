const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
// const { response } = require('express');
const jwt_secret = process.env.JWT_SECRET;

require('dotenv').config();

// Configuration de la base de données
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connexion à la base de données
conn.connect((err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Fonction pour s'inscrire
const register = (req, res) => {
    const { email, password } = req.body;
    const email_admin = process.env.EMAIL_ADMIN;

    // Vérifie si l'e-mail fourni correspond à l'e-mail admin
    if (email !== email_admin) {
        return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Vérification de l'existence de l'email
    const checkEmailQuery = 'SELECT * FROM portfolio WHERE email = ?';
    conn.query(checkEmailQuery, [email], (checkErr, results) => {
        if (checkErr) {
            return res.status(500).json({ success: false, message: 'Erreur lors de la recherche de l\'adresse e-mail' });
        }

        if (results.length > 0) {
            // L'adresse e-mail existe déjà dans la table "portfolio"
            return res.status(400).json({ message: 'Cette adresse e-mail est déjà enregistrée.' });
        }

        // Vérification des conditions regex du mot de passe
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({ message: 'Le mot de passe ne respecte pas les critères de sécurité.' });
        }

        // Hashage du mot de passe
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error('Erreur lors du hashage du mot de passe :', hashErr);
                return res.status(500).json({ error: 'Erreur lors du hashage du mot de passe' });
            }

            // Insertion de l'utilisateur dans la base de données
            const insertQuery = 'INSERT INTO portfolio (email, password) VALUES (?, ?)';
            conn.query(insertQuery, [email, hashedPassword], (insertErr) => {
                if (insertErr) {
                    console.error('Erreur lors de l\'insertion des données :', insertErr);
                    return res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
                }

                // Renvoyer la réponse ici
                res.status(200).json({ message: 'Utilisateur enregistré' });
            });
        });
    });
};

// Fonction pour se connecter
const login = (req, res) => {
    const { email, password } = req.body;

    // Vérification de l'existence de l'utilisateur
    const checkUserQuery = 'SELECT * FROM portfolio WHERE email = ?';
    conn.query(checkUserQuery, [email], async (checkErr, results) => {
        if (checkErr) {
            return res.status(500).json({ success: false, message: 'Erreur lors de la recherche de l\'utilisateur' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const user = results[0];

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Génération du jeton JWT pour la connexion
        const token = jwt.sign({ email: user.email }, jwt_secret, { expiresIn: '30m' });

        // Renvoyer la réponse ici
        res.status(200).json({ message: 'Connexion réussie', token });
    });
};

const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return null;
    }
    const matches = authorization.match(/(bearer)\s+(\S+)/i);

    return matches ? matches[2] : null;
};

const dashboard = (req, res) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'Token introuvable' })
    }

    jwt.verify(token, jwt_secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        req.decodedToken = decodedToken;

        console.log(decodedToken);

        console.log('Accès autorisé');
        return res.status(200).json({ message: 'Accès autorisé' });
    });
};

module.exports = { register, login, dashboard };