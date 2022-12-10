import { Router } from "express";
import { registrateCustomer, listCustomer, getCustomerById, updateCustomerById } from "../controllers/customersController.js";

const router = Router();

router.post("/customers", registrateCustomer);
router.get("/customers", listCustomer);
router.get("/customers/:id", getCustomerById);
router.put("/customers/:id", updateCustomerById);

export default router;