import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios'
import jwt_decode from 'jwt-decode';

import AddForm from '../../../../components/form/experience/addForm';
import EditForm from '../../../../components/form/experience/editForm';
import DeleteForm from '../../../../components/form/experience/deleteForm';


const CrudSkills = () => {
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
      .get('http://localhost:8000/getExperience')
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

        <h1>CRUD Expérience</h1>

        <div className='blockCRUD'>
          <div className='CRUD'>
            <div className='buttonCrud'>
            <button onClick={OpenAddForm}>Ajouter une expérience</button>
            <button onClick={OpenEditForm}>Modifier une expérience</button>
            <button onClick={OpenDeleteForm}>Supprimer une expérience</button>
            </div>
            {showAddForm && <AddForm />}
            {showEditForm && <EditForm />}
            {showDeleteForm && <DeleteForm />}
          </div>
          <div className='Liste'>
            <h2>Voici la liste des expériences</h2>
            <div className='ListeConnaissance'>
              {data.map((data, i) =>
                <div key={data.id_Experiences} className='blockListe'>
                  <p>{data.title}</p>
                  <p>{data.text} <span> ID : {data.id_Experiences}</span></p>

                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CrudSkills