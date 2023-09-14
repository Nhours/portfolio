import { FaReact, FaNode, FaCss3Alt } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

import Project1 from '../assets/Project1.png';
import Project2 from '../assets/Project2.png';

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
        project_name: "Restaurant app",
        project_desc: "It typically includes features such as a menu with prices, the ability to place an order, and the option to pay for the order directly through the app. Some restaurant applications also allow the customers to make reservations, view and the restaurant's location and hours, and access special deals and promotions.",
        tech_stack: ['React JS', 'Tailwind', 'Firebase'],
        project_img: Project1,
        project_url: 'https://www.youtube.com',
        reverse: false,
    },
    {
        id: 1,
        project_name: "Animax",
        project_desc: "An Anime Streaming Platform built with React Js. User can sign up and login to their account and watch their favourite anime.",
        tech_stack: ['React JS', 'Firebase'],
        project_img: Project2,
        project_url: 'https://www.youtube.com',
        reverse: false,
    }
]