import { connectionDB } from '../database.js';
import joi from 'joi';

const rentalSchema = joi.object({
    customerId: joi.number().positive().required(),
    gameId: joi.number().positive().required(),
    daysRented: joi.number().positive().required(),
    originalPrice: joi.number().positive().required()
});

export async function listRentals(req, res) {

    //SELECT * FROM receitas JOIN categorias ON receitas."idCategoria" = categorias.id
    try {

        //receber customerId ou gameId por parametros

        //join customerId and game
        //         const receitas = await connection.query(`
        //             SELECT * FROM receitas JOIN categorias ON receitas."idCategoria"=categorias.id
        // `);

        const rentals = await connectionDB.query(
            'SELECT * FROM rentals JOIN customers 0N rentals."customerId" = customers.id;'
        );
        console.log(rentals)
        res.status(200).send(rentals.rows);

    } catch (err) {
        res.status(500).send(err);
    };
};

export async function newRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const date = new Date();
    const rentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const returnDate = null;
    let originalPrice = null;
    const delayFee = null;

    const gameExist = await connectionDB.query('SELECT "pricePerDay" FROM games WHERE id=$1', [gameId]);    
    if (gameExist.rows.length === 0) {
        return res.status(400).send('O jogo não existe');
    } else {
        originalPrice = gameExist.rows[0].pricePerDay * daysRented;
    };

    const customerExist = await connectionDB.query('SELECT "id" FROM customers WHERE id=$1', [customerId]);
    if (customerExist.rows.length === 0) {
        return res.status(400).send('Cliente não cadastrado');
    };

    //Game available? se alugueis abertos >= estoque return res.sendStatus(400);
    //const gameAvailable = await connectionDB.query('', [])       

    const validation = rentalSchema.validate({ customerId, gameId, daysRented, originalPrice }, { abortEarly: false });
    if (validation.error) {
        const err = validation.error.details.map((d) => d.message);
        return res.status(422).send(err);
    };
    
    try {
        await connectionDB.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
        );

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err);
    };
};

export async function returnRental(req, res) {

};

export async function deleteRental(req, res) {

};