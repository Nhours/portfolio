const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Récuperer les compétences
router.get('/getSkills', userController.getAllSkills);
// Inserer une compétence
router.post('/insertSkills', userController.insertSkills);
// Modifier une compétence
router.put('/updateSkills/:id', userController.updateSkills);
// Supprimer une compétence
router.delete('/deleteSkills/:id', userController.deleteSkills);

// Récuperer les projets
router.get('/getProjects', userController.getAllProjects);
// Inserer un projet
router.post('/insertProjects', userController.insertProjects);
// Modifier un projet
router.put('/updateProjects/:id', userController.updateProjects);
// Supprimer un projet
router.delete('/deleteProjects/:id', userController.deleteProjects);

// Récuperer les expériences
router.get('/getExperience', userController.getAllExperience);

//Insérer une expérience
router.post('/insertExperience',userController.insertExperience)
// Modifier une expérience
router.put('/updateExperience/:id', userController.updateExperience);
// Supprimer une expérience
router.delete('/deleteExperience/:id', userController.deleteExperience);

// Récuperer les connaissances
router.get('/getConnaissances', userController.getAllConnaissance);
//Insérer une connaissance
router.post('/insertConnaissance',userController.insertConnaissance)
// Modifier une Connaissance
router.put('/updateConnaissance/:id', userController.updateConnaissance);
// Supprimer une expérience
router.delete('/deleteConnaissance/:id', userController.deleteConnaissance);

module.exports = router;