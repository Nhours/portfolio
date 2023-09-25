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

// import { Skills } from '../../utils/Data';

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
        const response = await fetch('/api/getSkills'); // Remplacez par votre URL de l'API
        if (response.ok) {
          const data = await response.json();
          console.log('Données des compétences reçues :', data); // Vérifiez les données reçues
          setSkills(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des compétences :', error);
      }
    };
  
    fetchSkills();
  }, []);

  // Fonction pour mettre à jour une compétence
  const handleSkillUpdate = async (updatedSkill) => {
    try {
      const response = await fetch(`/api/updateSkills/${updatedSkill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSkill),
      });

      if (response.ok) {
        // Mise à jour réussie, mettez à jour l'état local des compétences
        const updatedSkills = skills.map((skill) =>
          skill.id === updatedSkill.id ? updatedSkill : skill
        );
        setSkills(updatedSkills);
        setEditingSkillId(null); // Arrêtez l'édition
      } else {
        console.error('Erreur lors de la mise à jour de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la compétence :', error);
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
            {/* Afficher le formulaire de modification si l'ID de la compétence correspond à celui en cours d'édition */}
            {editingSkillId === skill.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Mettez à jour la compétence avec les nouvelles valeurs
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
              // Afficher les informations de la compétence si elle n'est pas en cours d'édition
              <>
                <IconContainer style={{ fontSize: '5rem' }} color="blue">
                  {skill.icon}
                </IconContainer>
                <Heading as="h4" size="h4">
                  {skill.tech}
                </Heading>
                {IsInLogin && (
                  <ParaText as="p" top="0.5rem" bottom="0">
                    ID: {skill.id}
                  </ParaText>
                )}
                {IsInLogin && (
                  <button onClick={() => setEditingSkillId(skill.id)}>
                    Modifier
                  </button>
                )}
              </>
            )}
          </SkillsCard>
          
          ))}
        </SkillsCardContainer>
        {IsInLogin && <button>Test</button>}

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
            create efficient and sustainable code that can adept
            to the changing needs of a business.
          </ParaText>
        </motion.div>
      </FlexContainer>
    </PaddingContainer>
  );
};

export default MySkills;