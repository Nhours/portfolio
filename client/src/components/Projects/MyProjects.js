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
    const [editingProjectData, setEditingProjectData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false); // État pour afficher/cacher la modale

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
                    setEditingProjectData(null);
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
        setEditingProjectData(project);
        setShowEditModal(true); // Ouvrir la modale
    };

    const handleCancelEdit = () => {
        setEditingProjectData(null);
        setShowEditModal(false); // Fermer la modale
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
                    {editingProjectData && editingProjectData.id === project.id ? (
                        // Modale pour l'édition du projet
                        <motion.div>
                            {showEditModal && editingProjectData && (
                                <div className="edit-modal">
                                    {IsInLogin && (
                                        <div>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleProjectUpdate(editingProjectData);
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Nom du projet"
                                                    value={editingProjectData.project_name}
                                                    onChange={(e) =>
                                                        setEditingProjectData({
                                                            ...editingProjectData,
                                                            project_name: e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Description du projet"
                                                    value={editingProjectData.project_desc}
                                                    onChange={(e) =>
                                                        setEditingProjectData({
                                                            ...editingProjectData,
                                                            project_desc: e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="URL de l'image du projet"
                                                    value={editingProjectData.project_img}
                                                    onChange={(e) =>
                                                        setEditingProjectData({
                                                            ...editingProjectData,
                                                            project_img: e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Technologies utilisées"
                                                    value={editingProjectData.tech_stack}
                                                    onChange={(e) =>
                                                        setEditingProjectData({
                                                            ...editingProjectData,
                                                            tech_stack: e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="URL du projet"
                                                    value={editingProjectData.project_url}
                                                    onChange={(e) =>
                                                        setEditingProjectData({
                                                            ...editingProjectData,
                                                            project_url: e.target.value,
                                                        })
                                                    }
                                                />
                                                <Button type="submit">Enregistrer</Button>
                                                <Button onClick={handleCancelEdit}>Annuler</Button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
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


            {/* Modale pour le formulaire d'édition */}
            {showEditModal && (
                <div className="edit-modal">
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
                                <Button type="submit">Ajouter</Button>
                                <Button onClick={handleCancelEdit}>Annuler</Button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </PaddingContainer>
    );
};

export default MyProjects;
