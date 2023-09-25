require('dotenv').config();
const mysql = require('mysql');

// const db = require('../config/db')
// const conn = mysql.createConnection(db);

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// SKILLS
const insertSkill = (req, res) => {
    // Extration des données du corps de la requete
    const { text } = req.body

    if (!text) {
        return res.status(400).json({
            error: 'Données incorrect'
        })
    }
    console.log('Données reçues du formulaire : ', req.body);
    const query = 'INSERT INTO `competences` (`text`) VALUES (?)';
    conn.query(query, [text], (err) => {
        if (err) {
            console.error('erreur')
            res.status(500).json({ error: 'erreur' })
        } else {
            res.status(200).json({ message: 'compétence enregistré' })
        }
    })
}

const getAllSkills = (req, res) => {

    const query = 'SELECT * FROM competences';
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

const updateSkills = (req, res) => {
    const { text } = req.body;
    const id_Competences = req.params.id;

    if (!text) {
        return res.status(400).json({
            error: 'Données incorrectes'
        });
    }

    const query = 'UPDATE `competences` SET `text` = ? WHERE id_Competences = ?';
    conn.query(query, [text, id_Competences], (err) => {
        if (err) {
            console.error("Erreur lors de la modification des données :" + err);
            res.status(500).json({ error: "Erreur lors de la modification des données" });
        } else {
            res.status(200).json({ message: 'Skills modifié' });
        }
    });
};

const deleteSkills = (req, res) => {

    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({
            error: 'ID du skill manquant dans les paramètres de la route'
        })
    }

    let query = `DELETE FROM competences WHERE id_Competences = ${userId}`
    conn.query(query, (err) => {
        if (err) {
            console.error("Erreur lors de la suppression des données :" + err);
            res.status(500).json({ error: "Erreur lors de la suppression des données" })
        } else {
            res.status(200).json({ message: 'Skills supprimé' })
        }
    })
}
// FIN SKILLS


// Projet
const insertProjet = (req, res) => {
    const { title, text, github, link } = req.body

    if (!title || !text || !github || !link) {
        return res.status(400).json({ error: 'Données incorrect' })
    }

    console.log('Données reçues du formulaire : ', req.body);

    const query = 'INSERT INTO `projet` (`title`, `text`, `github`, `link`) VALUES (?,?,?,?)';
    conn.query(query, [title, text, github, link], (err) => {
        if (err) {
            console.error('erreur')
            res.status(500).json({ error: 'erreur' })
        } else {
            res.status(200).json({ message: 'projet enregistré' })
        }
    })
}

const getAllProjet = (req, res) => {

    const query = 'SELECT * FROM projet';

    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

const updateProjet = (req, res) => {

    const { title, text, github, link } = req.body

    if (!title || !text || !github || !link) {
        return res.status(400).json({ error: 'Données incorrect' })
    }

    console.log('Données reçues du formulaire : ', req.body);

    const query = 'UPDATE `projet` SET `title` = ?, `text` = ?, `github` = ?, `link` = ? Where id_projets = ?'
    conn.query(query, [title, text, github, link, req.params.id], (err) => {
        if (err) {
            console.error("Erreur lors de la modification des données :" + err);
            res.status(500).json({ error: "Erreur lors de la modification des données" })
        } else {
            res.status(200).json({ message: 'Projet modifié' })
        }
    })
}

const deleteProjet = (req, res) => {

    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({
            error: 'ID du projet manquant dans les paramètres de la route'
        })
    }

    let query = `DELETE FROM projet WHERE id_projets = ${userId}`
    conn.query(query, (err) => {
        if (err) {
            console.error("Erreur lors de la suppression des données :" + err);
            res.status(500).json({ error: "Erreur lors de la suppression des données" })
        } else {
            res.status(200).json({ message: 'projet supprimé' })
        }
    })
}
// Fin Projet



// Experience
const insertExperience = (req, res) => {

    const { title, text } = req.body

    if (!title || !text) {
        res.status(400).json({ error: 'Données incorrect' })
    }

    console.log('Données reçues du formulaire : ', req.body);

    const query = 'INSERT INTO `experience` (`title`, `text`) VALUES (?,?)';
    conn.query(query, [title, text], (err) => {
        if (err) {
            console.error('erreur')
            res.status(500).json({ error: 'erreur' })
        } else {
            res.status(200).json({ message: 'expérience enregistré' })
        }
    })

}

const getAllExperience = (req, res) => {

    const query = 'SELECT * FROM `experience` ORDER BY id_Experiences DESC';

    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

const updateExperience = (req, res) => {
    const { title, text } = req.body

    console.log(req.body)

    if ( !title || !text ) {
        return res.status(400).json({ error: 'Données incorrect' })
    }
    console.log('Données reçues du formulaire : ', req.body);

    const query = 'UPDATE `experience` SET `title` = ?, `text` = ?  Where id_Experiences = ?'
    conn.query(query, [title, text, req.params.id], (err) => {
        if (err) {
            console.error("Erreur lors de la modification des données :" + err);
            res.status(500).json({ error: "Erreur lors de la modification des données" })
        } else {
            res.status(200).json({ message: 'Experience modifié' })
        }
    })
}
const deleteExperience = (req, res) => {

    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({
            error: 'ID de l\'experience manquant dans les paramètres de la route'
        })
    }

    let query = `DELETE FROM experience WHERE id_Experiences = ${userId}`
    conn.query(query, (err) => {
        if (err) {
            console.error("Erreur lors de la suppression des données :" + err);
            res.status(500).json({ error: "Erreur lors de la suppression des données" })
        } else {
            res.status(200).json({ message: 'experience supprimé' })
        }
    })
}
// Fin Experience


// Connaissance
const insertConnaissance = (req, res) => {

    const { logo_Connaissances } = req.body

    if (!logo_Connaissances) {
        res.status(400).json({ error: 'Données incorrect' })
    }

    console.log('Données reçues du formulaire : ', req.body);

    const query = 'INSERT INTO `connaissances` (`logo_Connaissances`) VALUES (?)';
    conn.query(query, [logo_Connaissances], (err) => {
        if (err) {
            console.error('erreur')
            res.status(500).json({ error: 'erreur' })
        } else {
            res.status(200).json({ message: 'Connaissances enregistré' })
        }
    })

}

const getAllConnaissance = (req, res) => {

    const query = 'SELECT * FROM `connaissances` ORDER BY id_Connaissances';

    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

const updateConnaissance = (req, res) => {

    const { logo_Connaissances } = req.body

    if (!logo_Connaissances) {
        return res.status(400).json({ error: 'Données incorrect' })
    }

    console.log('Données reçues du formulaire : ', req.body);

    const query = 'UPDATE `connaissances` SET `logo_Connaissances` = ? Where id_Connaissances = ?'
    conn.query(query, [logo_Connaissances, req.params.id], (err) => {
        if (err) {
            console.error("Erreur lors de la modification des données :" + err);
            res.status(500).json({ error: "Erreur lors de la modification des données" })
        } else {
            res.status(200).json({ message: 'Connaissance modifié' })
        }
    })
}

const deleteConnaissance = (req, res) => {

    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({
            error: 'ID de la connaissance est manquant dans les paramètres de la route'
        })
    }

    let query = `DELETE FROM connaissances WHERE id_Connaissances = ${userId}`
    conn.query(query, (err) => {
        if (err) {
            console.error("Erreur lors de la suppression des données :" + err);
            res.status(500).json({ error: "Erreur lors de la suppression des données" })
        } else {
            res.status(200).json({ message: 'connaissance supprimé' })
        }
    })
}
// Fin Connaissance

module.exports = {
    getAllSkills,
    getAllProjet,
    getAllExperience,
    getAllConnaissance,

    insertSkill,
    insertProjet,
    insertExperience,
    insertConnaissance,

    updateSkills,
    updateProjet,
    updateExperience,
    updateConnaissance,

    deleteSkills,
    deleteProjet,
    deleteExperience,
    deleteConnaissance
}