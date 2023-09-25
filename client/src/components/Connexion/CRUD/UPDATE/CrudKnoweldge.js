import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios'
import jwt_decode from 'jwt-decode';

import AddForm from '../../../../components/form/connaissance/addForm';
import DeleteForm from '../../../../components/form/connaissance/deleteForm';


const CrudKnoweldge = () => {
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
  const [showDeleteForm, setShowDeleteForm] = useState(false);


  const OpenAddForm = () => {
    setShowAddForm(true);
    setShowDeleteForm(false);
  };
  const OpenDeleteForm = () => {
    setShowAddForm(false);
    setShowDeleteForm(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/getConnaissances')
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

        <h1>CRUD Connaissances</h1>

        <div className='blockCRUD'>
          <div className='CRUD'>
            <div className='buttonCrud'>
            <button onClick={OpenAddForm}>Ajouter une connaissance</button>
            <button onClick={OpenDeleteForm}>Supprimer une connaissance</button>
            </div>
            {showAddForm && <AddForm />}
            {showDeleteForm && <DeleteForm />}
          </div>
          <div className='Liste'>
            <h2>Voici la liste des connaissances</h2>
            <div className='ListeConnaissance'>
              {data.map((item) =>
                <div key={item.id_Connaissances} className='blockListe'>
                  <img src={item.logo_Connaissances} alt="" />
                  <p> <span> ID : {item.id_Connaissances}</span></p>

                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CrudKnoweldge