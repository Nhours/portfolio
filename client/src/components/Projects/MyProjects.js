import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

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
    TechStackCard,
} from '../../styles/MyProject.styled';
import {
    fadeInTopVariant,
    fadeInRightVariant,
    fadeInLeftVariant,
} from '../../utils/Variants';

const MyProjects = ({ IsInLogin }) => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/getProjects');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    console.error(
                        'Réponse HTTP non OK :',
                        response.status,
                        response.statusText
                    );
                }
            } catch (error) {
                console.error('Erreur lors du chargement des compétences :', error.message);
            }
        };
        fetchProjects();
    }, []);

    const [newProject, setNewProject] = useState({
        project_name: '',
        project_desc: '',
        project_img: '',
        tech_stack: '',
        project_url: '',
    });

// Ajout d'un nouveau projet
    const handleProjectAdd = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/insertProjects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                const addedProject = await response.json();
                setProjects([...projects, addedProject]);
                setNewProject({
                    project_name: '',
                    project_desc: '',
                    project_img: '',
                    tech_stack: '',
                    project_url: '',
                });
            } else {
                console.error('Erreur lors de l\'ajout du projet');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du projet :', error);
        }
    };

    // Modification d'un projet existant
    const handleProjectUpdate = async (updatedProject) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/updateProjects/${updatedProject.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProject),
                }
            );

            if (response.ok) {
                const updatedProjectIndex = projects.findIndex(
                    (p) => p.id === updatedProject.id
                );
                if (updatedProjectIndex !== -1) {
                    const updatedProjects = [...projects];
                    updatedProjects[updatedProjectIndex] = updatedProject;
                    setProjects(updatedProjects);
                    setEditingProject(null);
                } else {
                    console.error('Projet introuvable dans la liste des projets.');
                }
            } else {
                console.error('Erreur lors de la mise à jour du projet');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet :', error);
        }
    };

    // Supprimer un projet
    const handleProjectDelete = async (projectId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/deleteProjects/${projectId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Supprimer le projet de la liste locale
                const updatedProjects = projects.filter((project) => project.id !== projectId);
                setProjects(updatedProjects);
            } else {
                console.error('Erreur lors de la suppression du projet');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du projet :', error);
        }
    };

    const handleEditClick = (project) => {
        setEditingProject(project);
    };

    const handleCancelEdit = () => {
        setEditingProject(null);
    };

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
                size="h2"
            >
                What <GreenText>I have built</GreenText>
            </Heading>

            {projects.map((project) => (
                <PaddingContainer key={project.id} top="5rem" bottom="5rem">
                    {editingProject && editingProject.id === project.id ? (
                        // Edit project form
                        <div>
                            <input
                                type="text"
                                placeholder="Nom du projet"
                                value={editingProject.project_name}
                                onChange={(e) =>
                                    setEditingProject({
                                        ...editingProject,
                                        project_name: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Technologies utilisées"
                                value={editingProject.tech_stack}
                                onChange={(e) =>
                                    setEditingProject({
                                        ...editingProject,
                                        tech_stack: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Description du projet"
                                value={editingProject.project_desc}
                                onChange={(e) =>
                                    setEditingProject({
                                        ...editingProject,
                                        project_desc: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="image du projet"
                                value={editingProject.project_img}
                                onChange={(e) =>
                                    setEditingProject({
                                        ...editingProject,
                                        project_img: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="url du projet"
                                value={editingProject.project_url}
                                onChange={(e) =>
                                    setEditingProject({
                                        ...editingProject,
                                        project_url: e.target.value,
                                    })
                                }
                            />
                            <button onClick={() => handleProjectUpdate(editingProject)}>
                                Enregistrer
                            </button>
                            <button onClick={handleCancelEdit}>Annuler</button>
                        </div>
                    ) : (
                        // Display project details
                        <FlexContainer
                            direction={project.reverse ? 'row-reverse' : false}
                            fullWidthChild
                        >
                            <motion.div
                                variants={
                                    project.reverse ? fadeInRightVariant : fadeInLeftVariant
                                }
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
                                        <TechStackCard>{project.tech_stack}</TechStackCard>
                                    </FlexContainer>
                                </PaddingContainer>
                                <ParaText top="1.5rem" bottom="2rem">
                                    {project.project_desc}
                                </ParaText>
                                <Button>Visiter le site</Button>
                            </motion.div>
                            <ProjectImageContainer
                                as={motion.div}
                                variants={
                                    project.reverse ? fadeInLeftVariant : fadeInRightVariant
                                }
                                initial="hidden"
                                whileInView="visible"
                                justify={project.reverse ? 'flex-start' : 'flex-end'} // Colle les images sur la droite de l'écran
                            >
                                <ProjectImage
                                    src={project.project_img}
                                    alt={project.project_name}
                                />
                            </ProjectImageContainer>
                            {IsInLogin && (
                            <div>
                                <button onClick={() => handleEditClick(project)}>Modifier</button>
                                <button onClick={() => handleProjectDelete(project.id)}>Supprimer</button>
                            </div>
                        )}
                        </FlexContainer>
                    )}
                </PaddingContainer>
            ))}
            {IsInLogin && (
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleProjectAdd();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Nom du projet"
                            value={newProject.project_name}
                            onChange={(e) =>
                                setNewProject({ ...newProject, project_name: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Description du projet"
                            value={newProject.project_desc}
                            onChange={(e) =>
                                setNewProject({ ...newProject, project_desc: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="URL de l'image du projet"
                            value={newProject.project_img}
                            onChange={(e) =>
                                setNewProject({ ...newProject, project_img: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Technologies utilisées"
                            value={newProject.tech_stack}
                            onChange={(e) =>
                                setNewProject({ ...newProject, tech_stack: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="URL du projet"
                            value={newProject.project_url}
                            onChange={(e) =>
                                setNewProject({ ...newProject, project_url: e.target.value })
                            }
                        />
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            )}
        </PaddingContainer>
    );
};

export default MyProjects;
