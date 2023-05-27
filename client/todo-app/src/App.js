import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('/api/todos')
        .then(response => {
          setTodos(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des Todos:', error);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    axios.post('/api/login', { emailOrUsername, password })
      .then(response => {
        // Connexion réussie
        setIsAuthenticated(true);
      })
      .catch(error => {
        // Erreur lors de la connexion
        console.error('Erreur lors de la connexion:', error);
      });
  };

  const handleRegister = () => {
    // Récupérer les données d'inscription (username, email, password) depuis les états du formulaire
    const userData = {
      username: username, // Remplacer "username" par l'état correspondant au champ d'username
      email: email, // Remplacer "email" par l'état correspondant au champ d'email
      password: password // Remplacer "password" par l'état correspondant au champ de mot de passe
    };
  
    // Envoyer une requête POST au serveur pour l'inscription
    axios.post('/api/register', userData)
      .then(response => {
        // L'inscription est réussie, vous pouvez effectuer des actions supplémentaires ici
        console.log('Inscription réussie');
      })
      .catch(error => {
        // Une erreur s'est produite lors de l'inscription, vous pouvez afficher un message d'erreur ou effectuer d'autres actions de gestion des erreurs
        console.error("Erreur lors de l'inscription:", error);
      });
  };
  
  
  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="content">
        {isAuthenticated ? (
          <TodoList todos={todos} />
        ) : (
        <div>
          <LoginForm onLogin={handleLogin} />
          <RegisterForm handleRegister={handleRegister} />
        </div>
        )}
      </div>
    </div>
  );
};

export default App;
