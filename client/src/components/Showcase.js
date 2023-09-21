import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import Global Styles
import {
    PaddingContainer,
    FlexContainer,
    Heading,
    ParaText,
    GreenText,
    IconContainer,
    Button
} from '../styles/Global.styled';

// Import Showcase Styles
import {
    ShowcaseImageCard,
    ShowcaseParticleContainer,
    Particle,
} from '../styles/Showcase.styled';

// Importing react-icons
import { BsLinkedin, BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";

// Import asset
import ShowcaseImg from '../assets/showcase-seb-img.png';
import BackgroundImg from '../assets/particle.png';

import {
    fadeInLeftVariant,
    fadeInRightVariant,
} from '../utils/Variants';

const Showcase = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const adminEmail = "alapideseb@hotmail.fr";
    const adminPassword = "Motdepasse123!"; // mot de passe admin complexe

    const handleLogin = () => {
        if (email === adminEmail && password === adminPassword) {
            // connexion admin réussie
            console.log("Connexion admin réussie");
        } else {
            // échec de la connexion admin
            console.log("Échec de la connexion admin");
        }
    }

    return (
        <PaddingContainer
            id="Home"
            left="3%"
            right="10%"
            top="18%"
            bottom="10%"
            responsiveLeft="1rem"
            responsiveRight="1rem"
            responsiveTop="8rem"
        >
            <FlexContainer align="center" fullWidthChild>
                {/* --left-content-- */}
                <motion.div
                    variants={fadeInLeftVariant}
                    initial="hidden"
                    whileInView="visible"
                >
                    <Heading as="h4" size="h4">Bonjour !</Heading>

                    <Heading
                        as="h2"
                        size="h2"
                        top="0.5rem"
                        bottom="1rem"
                    >
                        Je suis <GreenText>Sébastien ALAPIDE</GreenText>
                    </Heading>

                    <Heading
                        as="h3"
                        size="h3"
                        top="0.5rem"
                        bottom="1rem"
                    >
                        Je suis <GreenText>Développeur Web</GreenText>
                    </Heading>

                    <ParaText as="p" top="2rem" bottom="4rem">
                        Bonjour, je m'appelle Sébastien ALAPIDE et je me forme au métier de développeur web front-end.
                    </ParaText>

                    {/* social-icons */}
                    <FlexContainer gap="20px" responsiveFlex>
                        <IconContainer color="white" style={{ fontSize: '1.5rem' }}>
                            <BsLinkedin />
                        </IconContainer>

                        <IconContainer color="white" style={{ fontSize: '1.5rem' }}>
                            <BsTwitter />
                        </IconContainer>

                        <IconContainer color="white" style={{ fontSize: '1.5rem' }}>
                            <BsYoutube />
                        </IconContainer>

                        <IconContainer color="white" style={{ fontSize: '1.5rem' }}>
                            <BsInstagram />
                        </IconContainer>
                    </FlexContainer>
                </motion.div>

                {/* right-content */}
                <FlexContainer
                    as={motion.div}
                    variants={fadeInRightVariant}
                    initial="hidden"
                    whileInView="visible"
                    justify="flex-end"
                >
                    <ShowcaseParticleContainer>
                        <ShowcaseImageCard>
                            <img src={ShowcaseImg} alt="showcase" />
                        </ShowcaseImageCard>
                        {/* Particule supérieure avec le gestionnaire d'événements de clic */}
                        <div
                            onClick={() => setShowModal(true)}
                            style={{
                                position: 'absolute',
                                top: '-80px',
                                left: '20px',
                                cursor: 'pointer',
                                zIndex: 2,
                            }}
                        >
                            <Particle
                                as={motion.img}
                                animate={{
                                    x: [0, 100, 0],
                                    rotate: 360,
                                    scale: [1, 0.5, 1]
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                }}
                                src={BackgroundImg}
                                alt="particle"
                            />
                        </div>

                        <Particle
                            as={motion.img}
                            animate={{
                                y: [0, 100, 0],
                                rotate: 360,
                                scale: [1, 0.8, 1]
                            }}
                            transition={{
                                duration: 18,
                                repeat: Infinity,
                            }}
                            src={BackgroundImg}
                            alt="particle"
                            top="50px"
                            right="-70px"
                            rotate="0deg"
                        />

                        <Particle
                            as={motion.img}
                            animate={{
                                y: [0, -100, 0],
                                rotate: 360,
                                scale: [1, 0.9, 1]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                            }}
                            src={BackgroundImg}
                            alt="particle"
                            bottom="10px"
                            left="-70px"
                            rotate="50deg"
                        />
                    </ShowcaseParticleContainer>
                </FlexContainer>

                {/* Modal de connexion */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <Heading
                                as="h2"
                                size="h2"
                            >
                                <GreenText>Connexion admin</GreenText>
                            </Heading>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                onClick={handleLogin}>Se connecter</Button>
                            <Button onClick={() => setShowModal(false)}>Fermer</Button>
                        </div>
                    </div>
                )}
            </FlexContainer>
        </PaddingContainer>
    )
}

export default Showcase;
