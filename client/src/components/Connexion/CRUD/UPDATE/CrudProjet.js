import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './update.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import AddForm from '../../../../components/form/projet/addForm';
import EditForm from '../../../../components/form/projet/editForm';
import DeleteForm from '../../../../components/form/projet/deleteForm';

const CrudProjet = () => {
  const navigate = useNavigate();

  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/Connexion');
      return;
    }

    const decodedToken = jwt_decode(token);

    const authorizedEmail = 'd-alexis@hotmail.fr';

    if (decodedToken.payload.email !== authorizedEmail) {
      navigate('/Connexion');
      return;
    }

    setIsValidToken(true);
  }, [navigate]);

  if (!isValidToken) {
    navigate('/Connexion');
  }

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const OpenAddForm = () => {
    setShowAddForm(true);
    setShowEditForm(false)
    setShowDeleteForm(false);
  };

  const OpenEditForm = () => {
    setShowAddForm(false);
    setShowEditForm(true);
    setShowDeleteForm(false);
  };

  const OpenDeleteForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowDeleteForm(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/getProjet')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
          console.log(response.data);
        } else {
          console.log('Les données ne sont pas reçues : ', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <section className='Competence'>

        <h1>CRUD Projet</h1>

        <div className='blockCRUD'>
          <div className='CRUD'>
            <div className='buttonCrud'>
            <button onClick={OpenAddForm}>Ajouter un projet</button>
            <button onClick={OpenEditForm}>Modifier un projet</button>
            <button onClick={OpenDeleteForm}>Supprimer un projet</button>
            </div>
            {showAddForm && <AddForm />}
            {showEditForm && <EditForm />}
            {showDeleteForm && <DeleteForm />}
          </div>
          <div className='Liste'>
            <h2>Voici la liste des projets</h2>
            <div className='ListeConnaissance'>
              {data.map((data) =>
                <div key={data.id_projets} className='blockListe'>
                  <p>{data.title}</p>
                  <p>{data.text} </p>
                  <p>{data.github}</p>
                  <p><span>ID = {data.id_projets}</span></p>

                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CrudProjet