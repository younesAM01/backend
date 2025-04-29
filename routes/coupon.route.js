import { Router } from 'express';
import {
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
} from '../controllers/coupon.controller.js';

const couponRouter = Router();

couponRouter.get('/getcoupons', getCoupons);
couponRouter.post('/createcoupon', createCoupon);
couponRouter.put('/updatecoupon', updateCoupon);
couponRouter.delete('/deletecoupon', deleteCoupon);

export default couponRouter;
