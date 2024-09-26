// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.css'; // Assurez-vous que le chemin est correct

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout pour le message d'erreur global
  const navigate = useNavigate();

  // Identifiants enregistrés en dur
  const storedUsername1 = 'dupont@ecoles-epsi.net';
  const storedUsername2 = 'eleve@ecoles-epsi.net';
  const storedUsername3 = 'administrateur@ecoles-epsi.net';
  const storedPassword = 'pass';

  const handleLogin = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie si les champs sont vides
    if (!username || !password) {
      setErrorMessage("L'e-mail ou le mot de passe est invalide.");
    }
    // Vérifie si l'email est correct mais que le mot de passe est incorrect
    else if (
      (username === storedUsername1 || username === storedUsername2 || username === storedUsername3) &&
      password !== storedPassword
    ) {
      setErrorMessage('Mot de passe incorrect'); // Message spécifique pour mot de passe incorrect
    }
    // Vérifie si l'email et le mot de passe sont corrects
    else if (
      (username === storedUsername1 || username === storedUsername2 || username === storedUsername3) &&
      password === storedPassword
    ) {
      setErrorMessage(''); // Réinitialiser l'erreur si tout est correct
      navigate('/home'); // Rediriger vers la page principale
    } 
    // Si l'email est incorrect
    else {
      setErrorMessage('Utilisateur Inconnu');
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
          {/* Champ de saisie pour l'email */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="E-mail"
          />
          
          {/* Champ de saisie pour le mot de passe */}
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
