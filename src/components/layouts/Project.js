import React from 'react';

// Import Global Styles
import {
    PaddingContainer,
    Heading,
    FlexContainer,
    ParaText,
    IconContainer,
    Button,
} from '../../styles/Global.styled';

// Import project styles
import {
    TechStackCard,
    ProjectImage,
    ProjectImageContainer,
} from '../../styles/MyProject.styled';

// Import assets
import { FaGithub } from 'react-icons/fa';
// import Project1 from '../../assets/Project1.png'

const Project = ({ data }) => {
    return (
        <FlexContainer fullWidthChild>
            {/* left-section-project-content */}
            <div>
                <FlexContainer align="center" gap="1rem">
                    <Heading as="h3" size="h3" bottom="1rem">
                        {data.project_name}
                    </Heading>

                    <IconContainer color="blue" size="2rem">
                        <FaGithub />
                    </IconContainer>
                </FlexContainer>

                <PaddingContainer top="lrem">
                    <FlexContainer gap="1.5rem">
                        {data.tech_stack.map((stack) => (
                            <TechStackCard>{stack}</TechStackCard>
                        ))}
                    </FlexContainer>
                </PaddingContainer>

                <ParaText top="1.5rem" bottom="2rem">
                    {data.project_desc}
                </ParaText>

                <Button>Visit website</Button>
            </div>

            {/* right-section-project-image */}
            <ProjectImageContainer justify="flex-end">
                <ProjectImage
                    src={data.project_img}
                    alt={data.project_name} />
            </ProjectImageContainer>
        </FlexContainer>
    )
}

export default Project