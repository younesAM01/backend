import Review from '../models/review.model.js';
import User from '../models/user.model.js';

// GET all reviews or a single review by ID
export const getReviews = async (req, res) => {
    try {
        const id = req.query.id;


        if (id) {
            const review = await Review.findById(id)
                .populate({
                    path: 'userId',
                    select: 'firstName lastName profilePic'
                })
                .populate({
                    path: 'coachId',
                    select: 'firstName lastName profilePic'
                });
            if (!review) {
                return res.status(404).json({ success: false, error: "Review not found" });
            }
            return res.json({ success: true, data: review });
        }

        const reviews = await Review.find({})
            .populate({
                path: 'userId',
                select: 'firstName lastName profilePic'
            })
            .populate({
                path: 'coachId',
                select: 'firstName lastName profilePic'
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, data: reviews });
    } catch (error) {
        console.error('Error fetching review(s):', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// POST create a new review
export const createReview = async (req, res) => {
    try {
        const { quote, rating, userId, coachId } = req.body;

        if (!rating || !userId || !coachId) {
            return res.status(400).json({ success: false, error: "Rating, user ID, and coach ID are required fields" });
        }

        const user = await User.findById(userId);
        const coach = await User.findById(coachId);

        if (!user || !coach) {
            return res.status(404).json({ success: false, error: "User or coach not found" });
        }

        const reviewData = {
            name: {
                en: `${user.firstName} ${user.lastName}`,
                ar: `${user.firstName} ${user.lastName}`
            },
            trainerName: {
                en: `${coach.firstName} ${coach.lastName}`,
                ar: `${coach.firstName} ${coach.lastName}`
            },
            quote: { en: "", ar: "" },
            rating,
            image: user.profilePic || user.profilePicture || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg',
            userId,
            coachId
        };

        if (quote) {
            if (typeof quote === 'object') {
                if (quote.en) reviewData.quote.en = quote.en;
                if (quote.ar) reviewData.quote.ar = quote.ar;
            } else if (typeof quote === 'string') {
                reviewData.quote.en = quote;
            }
        }

        const newReview = await Review.create(reviewData);
        res.json({
            success: true,
            data: "Review created successfully",
            review: newReview
        });
    } catch (error) {
        console.error('Error creating review:', error);
        if (error.code === 11000) {
            return res.status(409).json({ success: false, error: "A review with these details already exists" });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// PUT update review
export const updateReview = async (req, res) => {
    try {
        const { name, trainerName, quote, rating, image } = req.body;
        const { id } = req.query;

        const updateFields = {};
        
        if (name) {
            if (typeof name === 'object') {
                updateFields.name = {};
                if (name.en) updateFields.name.en = name.en;
                if (name.ar) updateFields.name.ar = name.ar;
            }
        }
        
        if (trainerName) {
            if (typeof trainerName === 'object') {
                updateFields.trainerName = {};
                if (trainerName.en) updateFields.trainerName.en = trainerName.en;
                if (trainerName.ar) updateFields.trainerName.ar = trainerName.ar;
            }
        }
        
        if (quote) {
            if (typeof quote === 'object') {
                updateFields.quote = {};
                if (quote.en) updateFields.quote.en = quote.en;
                if (quote.ar) updateFields.quote.ar = quote.ar;
            }
        }
        
        if (rating !== undefined) updateFields.rating = rating;
        if (image) updateFields.image = image;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, error: "No fields provided to update" });
        }

        const updatedReview = await Review.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ success: false, error: "Review not found" });
        }

        res.json({
            success: true,
            data: "Review updated successfully",
            review: updatedReview
        });
    } catch (error) {
        console.error('Error updating review:', error);
        if (error.code === 11000) {
            return res.status(409).json({ success: false, error: "A review with these details already exists" });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ success: false, error: "Review ID is required" });
        }

        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ success: false, error: "Review not found" });
        }

        res.json({ success: true, data: "Review deleted successfully" });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
