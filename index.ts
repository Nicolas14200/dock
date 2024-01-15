import express, { Request, Response } from 'express';
import mysql from "mysql2";

const app = express();
const port = 3000;

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'test',
  connectionLimit: 100,
  port: 3306
};


const pool = mysql.createPool(config);

pool.query("CREATE DATABASE IF NOT EXISTS test;", (err, data) => {
  if (err) throw(err);
  console.log(data);
});

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );
`, (err, data) => {
  if (err) throw(err);
  console.log(data);
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Endpoint fonctionnel !');
});

app.post('/add', (req: Request, res: Response) => {
  pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      res.status(500).send('Erreur serveur');
      return;
    }
    console.log('The solution is: ', results[0].solution);
    res.status(200).send('Endpoint fonctionnel !');
  });
});

setTimeout(() => {
  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });
 }, 5000);