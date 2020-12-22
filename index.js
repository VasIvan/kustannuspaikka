const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const PORT = 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes

//GET all
app.get('/kustannuspaikka', async (req, res) => {
  try {
    const results = await pool.query(
      'SELECT * FROM kustannuspaikka ORDER BY tietueen_muutosaika DESC'
    );
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.log(err.message);
  }
});

//GET by Id(kustannuspaikkanumero)
app.get('/kustannuspaikka/:id', async (req, res) => {
  try {
    const kustannuspaikkanumero = req.params.id;
    const results = await pool.query(
      'SELECT * FROM kustannuspaikka WHERE kustannuspaikkanumero = $1',
      [kustannuspaikkanumero]
    );
    res.status(200).json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err.message);
  }
});

//CREATE
app.post('/kustannuspaikka', async (req, res) => {
  try {
    const {
      kustannuspaikka_nimi,
      vastuuhenkilon_nimi,
      vuosibudjetti,
      toteuma,
      tietueen_luontiaika,
      tietueen_muutosaika,
    } = req.body;
    const results = await pool.query(
      'INSERT INTO kustannuspaikka (kustannuspaikka_nimi, vastuuhenkilon_nimi, vuosibudjetti, toteuma, tietueen_luontiaika, tietueen_muutosaika) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        kustannuspaikka_nimi,
        vastuuhenkilon_nimi,
        vuosibudjetti,
        toteuma,
        tietueen_luontiaika,
        tietueen_muutosaika,
      ]
    );
    res.status(201).json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err.message);
  }
});

//UPDATE
app.put('/kustannuspaikka/:id', async (req, res) => {
  try {
    const kustannuspaikkanumero = req.params.id;
    const {
      kustannuspaikka_nimi,
      vastuuhenkilon_nimi,
      vuosibudjetti,
      toteuma,
      tietueen_muutosaika,
    } = req.body;
    const results = await pool.query(
      'UPDATE kustannuspaikka SET kustannuspaikka_nimi = $1, vastuuhenkilon_nimi = $2, vuosibudjetti = $3, toteuma = $4, tietueen_muutosaika = $5 WHERE kustannuspaikkanumero = $6 RETURNING *',
      [
        kustannuspaikka_nimi,
        vastuuhenkilon_nimi,
        vuosibudjetti,
        toteuma,
        tietueen_muutosaika,
        kustannuspaikkanumero,
      ]
    );
    res.status(200).json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err.message);
  }
});

//DELETE
app.delete('/kustannuspaikka/:id', async (req, res) => {
  try {
    const kustannuspaikkanumero = req.params.id;
    const results = await pool.query(
      'DELETE FROM kustannuspaikka WHERE kustannuspaikkanumero = $1',
      [kustannuspaikkanumero]
    );
    res.status(202).json({
      status: 'success',
      data: `Kustannuspaikkanumero ${kustannuspaikkanumero} was deleted!`,
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
