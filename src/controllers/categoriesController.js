import {connection} from '../database.js';

export async function getCategories(req, res){
    try{
        const categories = await connection.query('SELECT * FROM categories;');
        return res.send(categories.rows);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}