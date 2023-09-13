import React from 'react'

// Import Global Styles
import {
    PaddingContainer,
    FlexContainer,
    Heading,
    ParaText,
    BlueText,
    IconContainer,
} from '../styles/Global.styled';

// Import Showcase Styles
import {
    ShowcaseImageCard,
    ShowcasePartic1eContainer,
    Particle,
} from '../styles/Showcase.styled';

// Importing react-icons
import { BsLinkedin, BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";

// Import asset
import ShowcaseImg from '../assets/showcase-seb-img.png';
import BackgroundImg from '../assets/particle.png';

const Showcase = () => {
    return (
        <PaddingContainer
            id="Home"
            left="3%"
            right="10%"
            top="15%"
            bottom="10%"
        >
            <FlexContainer align="center" fullWidthChild>
                {/* --left-content-- */}
                <div>
                    <Heading as="h4" size="h4">Hello!</Heading>

                    <Heading
                        as="h2"
                        size="h2"
                        top="0.5rem"
                        bottom="1rem"
                    >
                        I'm <BlueText>Sébastien ALAPIDE</BlueText>
                    </Heading>

                    <Heading
                        as="h3"
                        size="h3"
                        top="0.5rem"
                        bottom="1rem"
                    >
                        I'm a <BlueText>Frontend Developer</BlueText>
                    </Heading>

                    <ParaText as="p" top="2rem" bottom="4rem">
                        Hello, my name is Sébastien ALAPIDE and I'm training to become a front-end web developer.
                    </ParaText>

                    {/* social-icons */}
                    <FlexContainer gap="20px">
                        <IconContainer color="white" size="1.5rem">
                            <BsLinkedin />
                        </IconContainer>

                        <IconContainer color="white" size="1.5rem">
                            <BsTwitter />
                        </IconContainer>

                        <IconContainer color="white" size="1.5rem">
                            <BsYoutube />
                        </IconContainer>

                        <IconContainer color="white" size="1.5rem">
                            <BsInstagram />
                        </IconContainer>
                    </FlexContainer>
                </div>

                {/* right-content */}
                <FlexContainer justify="flex-end">
                    <ShowcasePartic1eContainer>
                        <ShowcaseImageCard>
                            <img src={ShowcaseImg} alt="showcase" />
                        </ShowcaseImageCard>

                        <Particle
                            src={BackgroundImg}
                            alt="particle"
                            top="-80px"
                            left="20px"
                            rotate="60deg"
                        />

                        <Particle
                            src={BackgroundImg}
                            alt="particle"
                            top="50px"
                            right="-70px"
                            rotate="0deg"
                        />

                        <Particle
                            src={BackgroundImg}
                            alt="particle"
                            bottom="10px"
                            left="-70px"
                            rotate="50deg"
                        />
                    </ShowcasePartic1eContainer>
                </FlexContainer>

            </FlexContainer>
        </PaddingContainer>
    )
}

export default Showcase