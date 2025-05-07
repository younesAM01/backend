import { Router } from 'express';
import {
    getReviews,
    createReview,
    updateReview,
    deleteReview
} from '../controllers/review.controller.js';

const reviewRouter = Router();

reviewRouter.get('/getreviews', getReviews);
reviewRouter.post('/createreview', createReview);
reviewRouter.put('/updatereview', updateReview);
reviewRouter.delete('/deletereview', deleteReview);

export default reviewRouter;
