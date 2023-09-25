import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './update.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import AddForm from '../../../../components/form/competence/addForm';
import EditForm from '../../../../components/form/competence/editForm';
import DeleteForm from '../../../../components/form/competence/deleteForm';

const CrudExperience = () => {
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
      .get('http://localhost:8000/getSkills')
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

        <h1>CRUD Compétence</h1>

        <div className='blockCRUD'>
          <div className='CRUD'>
            <div className='buttonCrud'>
            <button onClick={OpenAddForm}>Ajouter une compétence</button>
            <button onClick={OpenEditForm}>Modifier une compétence</button>
            <button onClick={OpenDeleteForm}>Supprimer une compétence</button>
            </div>
            {showAddForm && <AddForm />}
            {showEditForm && <EditForm />}
            {showDeleteForm && <DeleteForm />}
          </div>
          <div className='Liste'>
            <h2>Voici la liste des compétences</h2>
            <div className='ListeConnaissance'>
              {data.map((data) =>
                <div key={data.id_Competences} className='blockListe'>
                  <p>{data.text} <span>ID = {data.id_Competences}</span></p>

                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CrudExperience