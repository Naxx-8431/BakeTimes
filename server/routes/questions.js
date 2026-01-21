const express = require('express');
const router = express.Router();
const {
    createQuestion,
    getAllQuestions,
    deleteQuestion
} = require('../controllers/questionController');

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.delete('/:id', deleteQuestion);

module.exports = router;
