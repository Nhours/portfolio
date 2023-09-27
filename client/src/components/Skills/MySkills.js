import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import Global Styles
import {
  PaddingContainer,
  FlexContainer,
  Heading,
  IconContainer,
  GreenText,
  ParaText,
} from '../../styles/Global.styled';

// Import My Skills styles
import {
  SkillsCardContainer,
  SkillsCard,
} from '../../styles/MySkills.styled';

import {
  fadeInLeftVariant,
  fadeInRightVariant,
} from '../../utils/Variants';

const MySkills = ({ IsInLogin }) => {
  const [skills, setSkills] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);

  useEffect(() => {
    // Fonction pour charger les compétences depuis le backend
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getSkills');
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        } else {
          console.error('Réponse HTTP non OK :', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des compétences :', error.message);
      }
    };
    fetchSkills();
  }, []);

  const [newSkill, setNewSkill] = useState({
    tech: '',
    icon: '',
  });

  // Fonction pour ajouter une compétence
  const handleSkillAdd = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/insertSkills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });

      if (response.ok) {
        const addedSkill = await response.json();
        setSkills([...skills, addedSkill]);
        setNewSkill({
          tech: '',
          icon: '',
        });
      } else {
        console.error('Erreur lors de l\'ajout de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la compétence :', error);
    }
  };

  // Fonction pour mettre à jour une compétence
  const handleSkillUpdate = async (updatedSkill) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateSkills/${updatedSkill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSkill),
      });

      if (response.ok) {
        const updatedSkills = skills.map((skill) =>
          skill.id === updatedSkill.id ? updatedSkill : skill
        );
        setSkills(updatedSkills);
        setEditingSkillId(null);
      } else {
        console.error('Erreur lors de la mise à jour de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la compétence :', error);
    }
  };

  // Fonction pour supprimer une compétence
  const handleSkillDelete = async (skillId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteSkills/${skillId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedSkills = skills.filter((skill) => skill.id !== skillId);
        setSkills(updatedSkills);
      } else {
        console.error('Erreur lors de la suppression de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence :', error);
    }
  };

  return (
    <PaddingContainer
      id="Skills"
      top="10%"
      bottom="10%"
      responsiveLeft="1rem"
      responsiveRight="1rem"
    >
      <FlexContainer
        responsiveFlex
        responsiveDirection="column-reverse"
        fullWidthChild
      >
        {/* left section */}
        <SkillsCardContainer
          id="skillIcon"
          as={motion.div}
          variants={fadeInLeftVariant}
          initial="hidden"
          whileInView="visible"
        >
          {skills.map((skill) => (
            <SkillsCard key={skill.id}>
              {editingSkillId === skill.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSkillUpdate({
                      id: skill.id,
                      tech: e.target.tech.value,
                      icon: e.target.icon.value,
                    });
                  }}
                >
                  <input type="text" name="tech" defaultValue={skill.tech} />
                  <input type="text" name="icon" defaultValue={skill.icon} />
                  <button type="submit">Mettre à jour</button>
                </form>
              ) : (
                  <>
                    <IconContainer style={{ fontSize: '1rem' }} color="blue">
                  <img
                    src={skill.icon} // Utilisez l'URL de l'image stockée dans la base de données
                    alt={skill.tech} // Utilisez le nom de la compétence comme texte alternatif
                    style={{ width: '70px', height: '70px' }} // Ajustez la taille de l'image selon vos besoins
                      />
                      </IconContainer>
                  <Heading as="h4" size="h4">
                    {skill.tech}
                  </Heading>
                  {/* {IsInLogin && (
                    <ParaText as="p" top="0.5rem" bottom="0">
                      ID: {skill.id}
                    </ParaText>
                  )} */}
                  {IsInLogin && (
                    <button onClick={() => setEditingSkillId(skill.id)}>Modifier</button>
                  )}
                  {IsInLogin && (
                    <button onClick={() => handleSkillDelete(skill.id)}>Supprimer</button>
                  )}
                </>
              )}
            </SkillsCard>
          ))}
          {IsInLogin && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSkillAdd();
                }}
              >
                <input
                  type="text"
                  placeholder="Nom de la compétence"
                  value={newSkill.tech}
                  onChange={(e) => setNewSkill({ ...newSkill, tech: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Icône de la compétence"
                  value={newSkill.icon}
                  onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                />
                <button type="submit">Ajouter</button>
              </form>
            </div>
          )}
        </SkillsCardContainer>

        {/* right-section */}
        <motion.div variants={fadeInRightVariant} initial="hidden" whileInView="visible">
          <Heading as="h4" size="h4">
            MY SKILLS
          </Heading>

          <Heading as="h2" size="h2" top="0.5rem">
            What <GreenText> I can do</GreenText>
          </Heading>

          <ParaText id="desc" top="2rem" bottom="1.5rem">
            As a Developer, I have a wide range of experience in front-end development. I am proficient in Javascript, React, HTML and CSS. My strong experience in building responsive and dynamic user interfaces using React has allowed me to create engaging and interactive web applications.

            I have experience in using React for building scalable
            and maintainable applications. This has allowed me to
            create efficient and sustainable code that can adapt
            to the changing needs of a business.
          </ParaText>
        </motion.div>
      </FlexContainer>
    </PaddingContainer>
  );
};

export default MySkills;