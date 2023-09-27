return (
    <PaddingContainer
        // ... (le reste du composant)
    >
        {/* ... (le reste du composant) */}
        {projects.map((project) => (
            <PaddingContainer key={project.id} top="5rem" bottom="5rem">
                {editingProject && editingProject.id === project.id ? (
                    // Edit project form
                    // ... (le reste du composant)
                ) : (
                    // Display project details
                    <FlexContainer
                        // ... (le reste du composant)
                    >
                        {/* ... (le reste du composant) */}
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
        {/* ... (le reste du composant) */}
    </PaddingContainer>
);
};

export default MyProjects;