import { connectionDB } from '../database.js';
import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required(),
});

export async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const validation = userSchema.validate({ name, image, stockTotal, categoryId, pricePerDay }, { abortEarly: false });
    if (validation.error) {
        const err = validation.error.details.map((d) => d.message);
        return res.status(422).send(err);
    };

    try {
        const teste = await connectionDB.query('INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay]);
        return res.sendStatus(201);
    } catch {
        return res.sendStatus(500);
    };
};

export async function listGames(req, res) {
    try {
        const games = connectionDB.query('SELECT * FROM games;');
        return res.status(200).send(games.rows);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    };
};