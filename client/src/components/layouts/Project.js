import React from 'react';
import { motion } from 'framer-motion';

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
import { fadeInLeftVariant, fadeInRightVariant } from '../../utils/Variants';

const Project = ({ data }) => {
    return (
        <FlexContainer
            direction={data.reverse ? 'row-reverse' : false}
            fullWidthChild
        >
            {/* left-section-project-content */}
            <motion.div
                variants={data.reverse ? fadeInRightVariant : fadeInLeftVariant}
                initial="hidden"
                whileInView="visible"
            >
                <FlexContainer align="center" gap="1rem">
                    <Heading as="h3" size="h3" bottom="1rem">
                        {data.project_name}
                    </Heading>

                    <IconContainer color="blue" size="2rem">
                        <FaGithub style={{ fontSize: '2rem' }}/>
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

                <Button>Visiter le site</Button>
            </motion.div>

            {/* right-section-project-image */}
            <ProjectImageContainer
            as={motion.div}
            variants={data.reverse ? fadeInLeftVariant : fadeInRightVariant}
            initial="hidden"
            whileInView="visible"
                justify={data.reverse ? "flex-start" : "flx-end"}
            >
                <ProjectImage
                    src={data.project_img}
                    alt={data.project_name} />
            </ProjectImageContainer>
        </FlexContainer>
    )
}

export default Project