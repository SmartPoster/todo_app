import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Envoyer les informations de connexion au backend
      const response = await axios.post('/api/login', { emailOrUsername, password });

      // Vérifier la réponse du serveur
      if (response.status === 200) {
        // Connexion réussie, effectuer les actions appropriées
        console.log('Login successful');
      } else {
        // Gérer les erreurs ou les réponses non valides
        console.log('Login failed');
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <form className="login-form">
      <input
        type="text"
        placeholder="Email or Username"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button type="button" onClick={handleLogin} className="login-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
