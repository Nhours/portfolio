import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import Global Styles
import {
    PaddingContainer,
    FlexContainer,
    Heading,
    GreenText,
    IconContainer,
    ParaText,
    Button,
} from '../../styles/Global.styled';

import {
    ProjectImageContainer,
    ProjectImage,
    TechStackCard
} from '../../styles/MyProject.styled';

// Import assets
import { FaGithub } from 'react-icons/fa';

import {
    fadeInTopVariant,
    fadeInRightVariant,
    fadeInLeftVariant
} from '../../utils/Variants';

const MyProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fonction pour charger les compétences depuis le backend
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/getProjects');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    console.error('Réponse HTTP non OK :', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des compétences :', error.message);
            }
        };
        fetchProjects();
    }, []);
    return (
        <PaddingContainer
            id="Projects"
            top="5%"
            bottom="5%"
            responsiveTop="20%"
            responsiveLeft="1rem"
            responsiveRight="1rem"
        >
            <Heading
                as={motion.h4}
                variants={fadeInTopVariant}
                initial="hidden"
                whileInView="visible"
                size="h4"
            >
                MY PROJECTS
            </Heading>

            <Heading
                as={motion.h2}
                variants={fadeInTopVariant}
                initial="hidden"
                whileInView="visible"
                size="h2">
                What <GreenText>I have built</GreenText>
            </Heading>

            {projects.map((project) => (
                <PaddingContainer key={project.id} top="5rem" bottom="5rem">
                    <FlexContainer
                        direction={project.reverse ? 'row-reverse' : false}
                        fullWidthChild
                    >
                        {/* left-section-project-content */}
                        <motion.div
                            variants={project.reverse ? fadeInRightVariant : fadeInLeftVariant}
                            initial="hidden"
                            whileInView="visible"
                        >
                            <FlexContainer align="center" gap="1rem">
                                <Heading as="h3" size="h3" bottom="1rem">
                                    {project.project_name}
                                </Heading>

                                <IconContainer color="blue" size="2rem">
                                    <FaGithub style={{ fontSize: '2rem' }} />
                                </IconContainer>
                            </FlexContainer>

                            <PaddingContainer top="lrem">
                                <FlexContainer gap="1.5rem">
                                    <TechStackCard>
                                        {project.tech_stack}
                                    </TechStackCard>
                                </FlexContainer>
                            </PaddingContainer>

                            <ParaText top="1.5rem" bottom="2rem">
                                {project.project_desc}
                            </ParaText>

                            <Button>Visiter le site</Button>
                        </motion.div>

                        {/* right-section-project-image */}
                        <ProjectImageContainer
                            as={motion.div}
                            variants={project.reverse ? fadeInLeftVariant : fadeInRightVariant}
                            initial="hidden"
                            whileInView="visible"
                            justify={project.reverse ? "flex-start" : "flex-end"}
                        >
                            <ProjectImage
                                src={project.project_img}
                                alt={project.project_name} />
                        </ProjectImageContainer>
                    </FlexContainer>
                </PaddingContainer>
            ))}

        </PaddingContainer>
    )
}

export default MyProjects