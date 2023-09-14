import React from 'react'

// Import Global Styles
import {
  PaddingContainer,
  FlexContainer,
  Heading,
  IconContainer,
  BlueText,
  ParaText,
  // ParaText,
  // BlueText,
} from '../styles/Global.styled';

// Import My Skills styles
import {
  SkillsCardContainer,
  SkillsCard,
} from '../styles/MySkills.styled';

import { Skills } from '../utils/Data';

const MySkills = () => {
  return (
    <PaddingContainer
      id="Skills"
      top="10%"
      bottom="10%"
    >
      <FlexContainer fullWidthChild>
        {/* left section */}
        <SkillsCardContainer>
          {Skills.map((skill) => (
            <SkillsCard>
              <IconContainer size='5rem' color='blue'>
                {skill.icon}
              </IconContainer>

              <Heading as="h4" size="h4">
                {skill.tech}
              </Heading>
            </SkillsCard>
          ))}
        </SkillsCardContainer>

        {/* right-section */}
        <div>
          <Heading as="h4" size="h4">
            MY SKILLS
          </Heading>

          <Heading as="h2" size="h2" top="0.5rem">
            What <BlueText> I can do</BlueText>
          </Heading>

          <ParaText top="2rem" bottom="1.5rem">
            As a Developer, I have a wide range of experience in front-end development. I am proficient in Javascript, React, HTML and CSS. My strong experience in building responsive and dynamic user interfaces using React has allowed me to create engaging and interactive web applications.
          </ParaText>

          <ParaText>
            I have experience in using React for building scalable
            and maintainable applications. This has allowed me to
            create efficient and sustainable code that can adept
            to the changing needs of a business.
          </ParaText>
        </div>
      </FlexContainer>

    </PaddingContainer>
  )
}

export default MySkills