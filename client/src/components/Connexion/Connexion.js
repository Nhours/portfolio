import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importez useNavigate

import "./Connexion.css";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Utilisez useNavigate pour obtenir la fonction de navigation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Envoyer une requête au serveur pour authentifier l'utilisateur
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      // Stocker le token JWT dans le localStorage
      localStorage.setItem("token", response.data.token);

      // Rediriger l'utilisateur vers la page protégée (Dashboards)
      navigate("/Dashboards");
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div className="Connexion">
    
      <form>
      <h1>Connexion</h1>
        <div>
          <label></label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Votre Email :"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label></label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Mot de passe :"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} type="submit">
          Se connecter
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Connexion;