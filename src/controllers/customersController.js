import { connectionDB } from "../database.js";
import joi from "joi";

const userSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().min(10).max(11), //requisito ser número
    cpf: joi.string().required().min(11).max(11),
    birthday: joi.string().required()
});

export async function registrateCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body;

    const validation = userSchema.validate({ name, phone, cpf, birthday }, { abortEarly: false });
    if (validation.error) {
        const err = validation.error.details.map((d) => d.message);
        return res.status(422).send(err);
    };

    //if cpf já existe return res.sendStatus(409);
    //if birthday invalido return res.sendStatus(400);

    try {
        await connectionDB.query(
            'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);',
            [name, phone, cpf, birthday]
        );
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err);
    };
};

export async function listCustomer(req, res) {
    try {
        const customers = await connectionDB.query(
            'SELECT * FROM customers;'
        );
        return res.status(200).send(customers.rows);

    } catch (err) {
        return res.status(500).send(err);
    };
};

export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const { rows } = await connectionDB.query(
            'SELECT * FROM customers WHERE id=$1', [id]
        );
        if (rows.length === 0) {
            return res.status(404).send("Não existe cadastro com o id informado");
        };

       res.status(200).send(rows[0]);

    } catch (err) {
        res.status(500).send(err);
    };
};

export async function updateCustomerById(req, res) {
    const {name, phone, cpf, birthday} = req.body;
    const { id } = req.params;

    const validation = userSchema.validate({ name, phone, cpf, birthday }, { abortEarly: false });
    if (validation.error) {
        const err = validation.error.details.map((d) => d.message);
        return res.status(422).send(err);
    };

    try {
        const { rows } = await connectionDB.query(
            'SELECT * FROM customers WHERE id=$1', [id]
        );
        if (rows.length === 0) {
            return res.status(404).send("Não existe cadastro com o id informado");
        };
        
        await connectionDB.query(
            'UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;',
            [name, phone, cpf, birthday, id]
        );
        res.sendStatus(200);
        
    } catch(err) {
        res.status(500).send(err);
    };  
};