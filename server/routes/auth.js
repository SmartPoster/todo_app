const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérifier les informations d'identification dans la base de données
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification des informations d\'identification :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la connexion' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    } else {
      const user = results[0];

      // Vérifier le mot de passe
      bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
        if (bcryptError) {
          console.error('Erreur lors de la comparaison des mots de passe :', bcryptError);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la connexion' });
        } else if (!isMatch) {
          res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        } else {
          // Générer un token JWT pour l'utilisateur authentifié
          const token = jwt.sign({ userId: user.id }, 'your_secret_key');

          // Renvoyer le token dans la réponse
          res.json({ token });
        }
      });
    }
  });
});

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Hasher le mot de passe avec bcrypt
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.error('Erreur lors de l\'hachage du mot de passe :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'inscription' });
    } else {
      // Enregistrer l'utilisateur dans la base de données
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (dbError) => {
        if (dbError) {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', dbError);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'inscription' });
        } else {
          // Renvoyer une réponse indiquant le succès de l'inscription
          res.json({ success: 'Inscription réussie' });
        }
      });
    }
  });
});

module.exports = router;
