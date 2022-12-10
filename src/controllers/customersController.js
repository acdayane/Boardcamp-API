import { connectionDB } from "../database.js";
import joi from "joi";

const userSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().min(10).max(11), //requisito ser número
    cpf: joi.string().required().min(11).max(11), //checar se é único
    birthday: joi.string().required() //validar data  
});

export async function registrateCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body;

    const validation = userSchema.validate({ name, phone, cpf, birthday }, { abortEarly: false });
    if (validation.error) {
        const err = validation.error.details.map((d) => d.message);
        return res.status(422).send(err);
    };

    //if cpf já existe return res.sendStatus(409);
    //if data invalida return res.sendStatus(400);

    try {
        await connectionDB.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    };
};

export async function listCustomer(req, res) {
    try {
        const customers = await connectionDB.query('SELECT * FROM customers;');
        return res.status(200).send(customers.rows);
    } catch (err) {
        return res.status(500).send(err);
    };
};

export async function getCustomerById(req, res) {

};

export async function updateCustomerById(req, res) {

};