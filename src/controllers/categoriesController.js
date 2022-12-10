import { connectionDB } from '../database.js';
import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().required().min(4).max(50),
});

export async function getCategories(req, res) {
    try {
        const categories = await connectionDB.query('SELECT * FROM categories;');
        return res.status(200).send(categories.rows);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    };
};

export async function createCategory(req, res) {
    const { name } = req.body;

    const validation = userSchema.validate({ name }, { abortEarly: false });
    if (validation.error) {
        const err = validation.error.details.map((d) => d.message);
        return res.status(422).send(err);
    };

    try {
        await connectionDB.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    };
};