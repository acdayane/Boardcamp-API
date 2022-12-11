import { Router } from "express";
import { listRentals, newRental, returnRental, deleteRental } from '../controllers/rentalsController.js';

const router = Router();

router.get('/rentals', listRentals);
router.post('/rentals', newRental);
router.post('/rentals:id/return', returnRental);
router.delete('/rentals/:id', deleteRental);

export default router;