// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.css'; // Assurez-vous que le chemin est correct

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout pour le message d'erreur global
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("L'e-mail ou le mot de passe est invalide."); // Message d'erreur global
    } else {
      setErrorMessage(''); // Réinitialiser l'erreur si tout est correct
      navigate('/home'); // Redirige vers la page principale si aucune erreur
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>MyCampus</h1>
      </header>

      <div className="form-container">
        <h2>Se connecter</h2>
        <form onSubmit={handleLogin}>
          {/* Input pour l'email */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="E-mail"
          />
          
          {/* Input pour le mot de passe */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />

          {/* Message d'erreur global */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Bouton de connexion */}
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
