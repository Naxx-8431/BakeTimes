const Question = require('../models/Question');

// ============================================
// @desc    Submit a Question
// @route   POST /api/questions
// @access  Public
// ============================================
exports.createQuestion = async (req, res) => {
    try {
        const { name, email, recipeName, question } = req.body;

        if (!name || !email || !recipeName || !question) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields'
            });
        }

        const newQuestion = await Question.create({
            name,
            email,
            recipeName,
            question
        });

        res.status(201).json({
            success: true,
            message: 'Question submitted successfully! We will get back to you soon.',
            data: newQuestion
        });
    } catch (error) {
        console.error('Error submitting question:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ============================================
// @desc    Get all questions
// @route   GET /api/questions
// @access  Admin
// ============================================
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ============================================
// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Admin
// ============================================
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        await Question.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Question deleted'
        });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
