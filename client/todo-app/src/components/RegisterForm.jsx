import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Envoyer les informations d'inscription au backend
      const response = await axios.post('/api/register', { username, email, password });

      // Vérifier la réponse du serveur
      if (response.status === 200) {
        // Inscription réussie, effectuer les actions appropriées
        console.log('Registration successful');
      } else {
        // Gérer les erreurs ou les réponses non valides
        console.log('Registration failed');
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error('An error occurred during registration:', error);
    }
  };

  return (
    <form className="register-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="register-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="register-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />
      <button type="button" onClick={handleRegister} className="register-button">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
