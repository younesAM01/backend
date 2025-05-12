import Coupon from '../models/coupon.model.js';

// GET all coupons or a single coupon by ID
export const getCoupons = async (req, res) => {
    try {
        const id = req.query.id;


        if (id) {
            const coupon = await Coupon.findById(id);
            if (!coupon) {
                return res.status(404).json({ success: false, error: "Coupon not found" });
            }
            return res.json({ success: true, data: coupon });
        }

        const coupons = await Coupon.find({}).sort({ createdAt: -1 });

        const updatedCoupons = await Promise.all(coupons.map(async (coupon) => {
            if (coupon.expiryDate < new Date() && coupon.status !== 'expired') {
                coupon.status = 'expired';
                await coupon.save();
            }
            return coupon;
        }));

        res.json({ success: true, data: updatedCoupons });
    } catch (error) {
        console.error('Error fetching coupon(s):', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// POST create a new coupon
export const createCoupon = async (req, res) => {
    try {
        const { name, percentage, expiryDate } = req.body;

        if (!name || percentage === undefined || !expiryDate) {
            return res.status(400).json({ success: false, error: "Name, percentage, and expiry date are required" });
        }

        if (percentage < 0 || percentage > 100) {
            return res.status(400).json({ success: false, error: "Percentage must be between 0 and 100" });
        }

        const expiryDateObj = new Date(expiryDate);
        if (isNaN(expiryDateObj.getTime())) {
            return res.status(400).json({ success: false, error: "Invalid expiry date" });
        }


        const newCoupon = await Coupon.create({
            name,
            percentage,
            expiryDate: expiryDateObj,
            status: expiryDateObj < new Date() ? 'expired' : 'active'
        });

        res.json({
            success: true,
            data: "Coupon created successfully",
            coupon: newCoupon
        });
    } catch (error) {
        console.error('Error adding coupon:', error);
        if (error.code === 11000) {
            return res.status(409).json({ success: false, error: "A coupon with this name already exists" });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// PUT update coupon
export const updateCoupon = async (req, res) => {
    try {
        const { name, percentage, expiryDate, status } = req.body;
        const { id } = req.query;


        const updateFields = {};
        if (name) updateFields.name = name;
        if (percentage !== undefined) {
            if (percentage < 0 || percentage > 100) {
                return res.status(400).json({ success: false, error: "Percentage must be between 0 and 100" });
            }
            updateFields.percentage = percentage;
        }
        if (expiryDate) {
            const expiryDateObj = new Date(expiryDate);
            if (isNaN(expiryDateObj.getTime())) {
                return res.status(400).json({ success: false, error: "Invalid expiry date" });
            }
            updateFields.expiryDate = expiryDateObj;
            updateFields.status = expiryDateObj < new Date() ? 'expired' : 'active';
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, error: "No fields provided to update" });
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ success: false, error: "Coupon not found" });
        }

        res.json({
            success: true,
            data: "Coupon updated successfully",
            coupon: updatedCoupon
        });
    } catch (error) {
        console.error('Error updating coupon:', error);
        if (error.code === 11000) {
            return res.status(409).json({ success: false, error: "A coupon with this name already exists" });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE coupon
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ success: false, error: "Coupon ID is required" });
        }


        const deletedCoupon = await Coupon.findByIdAndDelete(id);

        if (!deletedCoupon) {
            return res.status(404).json({ success: false, error: "Coupon not found" });
        }

        res.json({ success: true, data: "Coupon deleted successfully" });
    } catch (error) {
        console.error('Error deleting coupon:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
