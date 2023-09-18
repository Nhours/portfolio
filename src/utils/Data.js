import { FaReact, FaNode, FaCss3Alt } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

import Project1 from '../assets/CV.png';
import Project2 from '../assets/Tangram.png';
import Project3 from '../assets/About.png';
import Project4 from '../assets/Backend.png';
import Project5 from '../assets/Mystery.png';
import Project6 from '../assets/Personality.png';
import Project7 from '../assets/Marvel.png';
import Project8 from '../assets/RestAPI.png';

export const Skills = [
    {
        id: 0,
        tech: 'React JS',
        icon: <FaReact />
    },
    {
        id: 1,
        tech: 'Node JS',
        icon: <FaNode />
    },
    {
        id: 2,
        tech: 'CSS',
        icon: <FaCss3Alt />
    },
    {
        id: 3,
        tech: 'Javascript',
        icon: <SiJavascript />
    },
]


export const projectDetails = [
    {
        id: 0,
        project_name: "CV en ligne",
        project_desc: "Ce projet demandait la création d'un CV numérique. L'un des objectifs était de produire une page représentative du CV avec une version optimisée pour les appareils mobiles en adoptant le concept Mobile First. Puis, une version adaptée aux ordinateurs en incorporant des fonctionnalités Javascript.",
        tech_stack: ['HTML', 'CSS', 'Javascript'],
        project_img: Project1,
        project_url: 'https://www.youtube.com',
        reverse: false,
    },
    {
        id: 1,
        project_name: "Tangram",
        project_desc: "Ce projet visait à nous faire créer des figures de Tangram en CSS et à les animer pour les faire deviner. Les contraintes incluent la reconstitution des modèles uniquement à partir de l'inspecteur du navigateur par <la main>.",
        tech_stack: ['HTML', 'CSS', 'Javascript'],
        project_img: Project2,
        project_url: 'https://www.youtube.com',
        reverse: true,
    },
    {
        id: 2,
        project_name: "About me",
        project_desc: "Ce projet visait à créer un site web complet et informatif pour présenter notre profil, nos compétences, nos aspirations et nos passions, tout en respectant les normes du langage HTML5 / CSS3.",
        tech_stack: ['HTML', 'CSS', 'PHP', 'Docker'],
        project_img: Project3,
        project_url: 'https://www.youtube.com',
        reverse: false,
    },
    {
        id: 3,
        project_name: "Back-end",
        project_desc: "Ce projet visait à nous faire créer la partie backend d'un site permettant de sauvegarder des données en session via un formulaire.",
        tech_stack: ['HTML', 'Bootstrap', 'PHP', 'Docker'],
        project_img: Project4,
        project_url: 'https://www.youtube.com',
        reverse: true,
    },
    {
        id: 4,
        project_name: "Mystery number",
        project_desc: "Ce projet demandait de créer un mini-jeu pour deviner un nombre mystère. Un nombre est choisi au hasard entre 1 et 10 et le joueur à 3 chances pour le deviner. En bonus, trois niveaux de difficultés étaient proposé.",
        tech_stack: ['HTML', 'CSS', 'Javascript'],
        project_img: Project5,
        project_url: 'https://www.youtube.com',
        reverse: false,
    },
    {
        id: 5,
        project_name: "Personality",
        project_desc: "Cette application présente cinq acteurs/actrices. Les utilisateurs découvrent ces stars grâce à des photos en noir et blanc qui ajoutent une touche de mystère. En cliquant sur une photo, ils révèlent la vraie couleur de l'acteur/actrice et accèdent à une description détaillée mettant en avant leurs performances et leurs meilleurs films.",
        tech_stack: ['HTML', 'CSS', 'Javascript'],
        project_img: Project6,
        project_url: 'https://www.youtube.com',
        reverse: true,
    },
    {
        id: 6,
        project_name: "BDD Marvel",
        project_desc: "Ce projet visait à créer une base de données relationnelle pour stocker des informations sur l'Univers Cinématographique Marvel en vue de développer un site web ultérieurement. Les entités incluent les films, les acteurs/actrices, les réalisateurs et les utilisateurs, avec des attributs spécifiques pour chaque entité.",
        tech_stack: ['MySQL', 'Docker'],
        project_img: Project7,
        project_url: 'https://www.youtube.com',
        reverse: false,
    },
    {
        id: 7,
        project_name: "Consommer une API",
        project_desc: "Ce projet visait à développer une mini interface front en HTML, CSS et JS VANILLA afin de consommer une API REST.",
        tech_stack: ['HTML', 'CSS', 'Javascript'],
        project_img: Project8,
        project_url: 'https://www.youtube.com',
        reverse: true,
    },
]

export const navLinks = [
    {
        id: 0,
        name: 'Home',
        href: 'Home'
    },
    {
        id: 1,
        name: 'My Skills',
        href: 'Skills'
    },
    {
        id: 2,
        name: 'My Projects',
        href: 'Projects'
    },
    {
        id: 3,
        name: 'My Contact',
        href: 'Contact'
    },
]