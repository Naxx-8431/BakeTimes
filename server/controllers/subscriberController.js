const Subscriber = require('../models/Subscriber');

// ============================================
// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
// ============================================
exports.subscribe = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if duplicate
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            // Allow re-subscribing logic if needed, or just say success/already subscribed
            return res.status(400).json({
                success: false,
                message: 'This email is already subscribed!'
            });
        }

        const subscriber = await Subscriber.create({
            email,
            name
        });

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to the newsletter!',
            data: subscriber
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already subscribed' });
        }
        console.error('Error subscribing:', error);
        res.status(500).json({
            success: false,
            message: 'Server error subscribing',
            error: error.message
        });
    }
};

// ============================================
// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Admin
// ============================================
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: subscribers.length,
            data: subscribers
        });
    } catch (error) {
        console.error('Error getting subscribers:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ============================================
// @desc    Delete subscriber
// @route   DELETE /api/subscribers/:id
// @access  Admin
// ============================================
exports.deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Subscriber not found'
            });
        }

        await Subscriber.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Subscriber removed'
        });
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
