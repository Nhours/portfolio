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
    const [showAddForm, setShowAddForm] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // État pour la boîte de dialogue
    const [projectIdToDelete, setProjectIdToDelete] = useState(null); // État pour stocker l'ID du projet à supprimer
    const [previewImageUrl, setPreviewImageUrl] = useState(''); // État pour stocker l'URL de l'image de prévisualisation
    const [previewNewProjectImageUrl, setPreviewNewProjectImageUrl] = useState(''); // État pour stocker l'URL de l'image de prévisualisation du nouveau projet

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
        github_url: '',
    });

    // Fonction pour annuler l'ajout de projet
    const handleCancelProject = () => {
        setNewProject({
            project_name: '',
            project_desc: '',
            project_img: '',
            tech_stack: '',
            project_url: '',
            github_url: '',
        });
        setPreviewNewProjectImageUrl(''); // Réinitialisez l'état de la prévisualisation de l'image
        setShowAddForm(false);
    };

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
                    github_url: '',
                });
                setShowAddForm(false);
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
        setPreviewImageUrl(project.project_img);
    };

    const handleCancelEdit = () => {
        setEditingProject(null);
        setPreviewImageUrl('');
    };

    // Supprimer un projet avec confirmation
    const handleProjectDeleteWithConfirmation = (projectId) => {
        setProjectIdToDelete(projectId);
        setIsDeleteConfirmationOpen(true);
    };

    // Fonction pour confirmer la suppression et effectuer la suppression réelle
    const confirmProjectDelete = async () => {
        if (projectIdToDelete) {
            await handleProjectDelete(projectIdToDelete);
            setIsDeleteConfirmationOpen(false);
            setProjectIdToDelete(null);
        }
    };

    // Annuler la suppression
    const cancelProjectDelete = () => {
        setIsDeleteConfirmationOpen(false);
        setProjectIdToDelete(null);
    };

    // URL du projet GitHub
    const handleGitHubClick = (githubUrl) => {
        window.open(githubUrl, '_blank');
    };

    // URL du projet GitHub
    const handleProjectClick = (projectUrl) => {
        window.open(projectUrl, '_blank');
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

            {projects.map((project, index) => (
                <PaddingContainer key={project.id} top="5rem" bottom="5rem">
                    {editingProject && editingProject.id === project.id ? (
                        // Formulaire de modifications du projet
                        <motion.div className="edit-modal">
                            <div>
                                <Heading as="h2" size="h2">
                                    Modifier le projet
                                </Heading>
                                <div>
                                    <div>
                                        <label>Nom du projet:</label>
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
                                    </div>
                                    <div>
                                        <label>Technologies utilisées:</label>
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
                                    </div>
                                    <div>
                                        <label>Description du projet:</label>
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
                                    </div>
                                    <div>
                                        <label>Image du projet:</label>
                                        <input
                                            type="text"
                                            placeholder="URL de l'image du projet"
                                            value={editingProject.project_img}
                                            onInput={(e) => {
                                                setEditingProject({
                                                    ...editingProject,
                                                    project_img: e.target.value,
                                                });
                                                setPreviewImageUrl(e.target.value);
                                            }}
                                        />
                                        {previewImageUrl && (
                                            <img
                                                src={previewImageUrl}
                                                alt="ImagePreview"
                                                className="image-preview"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label>URL du projet:</label>
                                        <input
                                            type="text"
                                            placeholder="URL du projet"
                                            value={editingProject.project_url}
                                            onChange={(e) =>
                                                setEditingProject({
                                                    ...editingProject,
                                                    project_url: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label>URL du github:</label>
                                        <input
                                            type="text"
                                            placeholder="URL du github"
                                            value={editingProject.github_url}
                                            onChange={(e) =>
                                                setEditingProject({
                                                    ...editingProject,
                                                    github_url: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <Button onClick={() => handleProjectUpdate(editingProject)}>
                                        Modifier
                                    </Button>
                                    <Button onClick={handleCancelEdit}>Annuler</Button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (

                        // Affiche les projets
                        <FlexContainer
                        direction={index % 2 === 0 ? 'row-reverse' : 'row'}
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
                                    <IconContainer color="blue" size="2rem" onClick={() => handleGitHubClick(project.github_url)}>
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
                                <Button onClick={() => handleProjectClick(project.project_url)}>Visiter le site</Button>
                                {IsInLogin && (
                                    <div>
                                        <Button onClick={() => handleEditClick(project)}>Modifier un projet</Button>
                                        <Button onClick={() => handleProjectDeleteWithConfirmation(project.id)}>Supprimer un projet</Button>
                                    </div>
                                )}
                            </motion.div>
                            <ProjectImageContainer
                                as={motion.div}
                                variants={
                                    project.reverse ? fadeInLeftVariant : fadeInRightVariant
                                }
                                initial="hidden"
                                whileInView="visible"
                                justify={index % 2 === 0 ? 'flex-start' : 'flex-end'} // Colle les images sur la droite de l'écran
                            >
                                <ProjectImage
                                    src={project.project_img}
                                    alt={project.project_name}
                                />
                            </ProjectImageContainer>
                        </FlexContainer>
                    )}

                    {/* Ajouter un projet */}
                    {IsInLogin && index === projects.length - 1 && (
                        <div className="column-layout centered-form">
                            <div>
                                <Heading as="h2" size="h2">
                                    Ajouter un projet
                                </Heading>
                            </div>
                            <label>Nom du projet:</label>
                            <input
                                type="text"
                                placeholder="Nom du projet"
                                value={newProject.project_name}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        project_name: e.target.value,
                                    })
                                }
                            />
                            <label>Technologies utilisées:</label>
                            <input
                                type="text"
                                placeholder="Technologies utilisées"
                                value={newProject.tech_stack}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        tech_stack: e.target.value,
                                    })
                                }
                            />
                            <label>Description du projet:</label>
                            <input
                                type="text"
                                placeholder="Description du projet"
                                value={newProject.project_desc}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        project_desc: e.target.value,
                                    })
                                }
                            />
                            <label>Image du projet:</label>
                            <input
                                type="text"
                                placeholder="URL de l'image du projet"
                                value={newProject.project_img}
                                onInput={(e) => {
                                    setNewProject({
                                        ...newProject,
                                        project_img: e.target.value,
                                    });
                                    setPreviewNewProjectImageUrl(e.target.value);
                                }}
                            />
                            {previewNewProjectImageUrl && (
                                <img
                                    src={previewNewProjectImageUrl}
                                    alt="previewNewProjectImage"
                                    className="image-preview"
                                />
                            )}
                            <label>URL du projet:</label>
                            <input
                                type="text"
                                placeholder="URL du projet"
                                value={newProject.project_url}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        project_url: e.target.value,
                                    })
                                }
                            />
                            <label>URL du github:</label>
                            <input
                                type="text"
                                placeholder="URL du gihub"
                                value={newProject.github_url}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        github_url: e.target.value,
                                    })
                                }
                            />
                            <div>
                                <Button onClick={handleProjectAdd}>Ajouter un projet</Button>
                                <Button onClick={handleCancelProject}>Annuler</Button>
                            </div>
                        </div>
                    )}

                    {/* Boîte de dialogue de confirmation de la suppression */}
                    {isDeleteConfirmationOpen && (
                        <div className="delete-confirmation-modal">
                            <div>
                                <p>Êtes-vous sûr de vouloir supprimer ce projet ?</p>
                                <div>
                                    <Button onClick={confirmProjectDelete}>Confirmer</Button>
                                    <Button onClick={cancelProjectDelete}>Annuler</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </PaddingContainer>
            ))}
        </PaddingContainer>
    );
};

export default MyProjects;