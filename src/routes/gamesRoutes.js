import { Router } from "express";
import { createGame, listGames } from "../controllers/gamesController.js";

const router = Router();

router.post('/games', createGame);
router.get('/games', listGames);

export default router;