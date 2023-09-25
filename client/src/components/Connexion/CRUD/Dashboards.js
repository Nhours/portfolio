import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboards.css';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Dashboards() {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/Connexion');
      return;
    } 
    const decodedToken = jwt_decode(token);

    const authorizedEmail = 'alapideseb@hotmail.fr';

    if (decodedToken.payload.email !== authorizedEmail) {
      navigate('/Connexion');
      return;
    }

    setIsValidToken(true);
  }, [navigate]);

  if (!isValidToken) {
    navigate('/Connexion');
  }

  return (
    <div className='Dashboards'>
      <h1>Bienvenue sur votre page Admin</h1>
      <p>Cette page vous permettra d'ajouter, modifier et supprimer des éléments de votre site !</p>
      <div className='blockChoix'>
        <Link to="/Skills">
          <div className='choix'>
            <p>CRUD SKILLS</p>
          </div>
        </Link>
        <Link to="/Experience">
          <div className='choix'>
            <p>CRUD EXPERIENCES</p>
          </div>
        </Link>
        <Link to="/Knoweldge">
          <div className='choix'>
            <p>CRUD KNOWELDGE</p>
          </div>
        </Link>
        <Link to="/Projet">
          <div className='choix'>
            <p>CRUD PROJET</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboards;
