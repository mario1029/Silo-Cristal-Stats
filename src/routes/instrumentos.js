const express = require('express');
const router = express.Router();
const {
  getInstruments,
  getInstrumentByID,
  insertInstrument,
  updateInstrument,
  deleteInstrument,
} = require('../helpers/instrumentos');

router.post('/new', async (req, res) => {
  try {
    const respuesta = await insertInstrument(req.body);
    res
      .status(200)
      .json({ status: 200, data: respuesta, message: 'Instrumento agregado' });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: raspuesta,
      message: 'Fallo: Instrumento no agregado',
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const respuesta = await deleteInstrument(req.params.id);
    res
      .status(200)
      .json({ status: 200, data: respuesta, message: 'Instrumento borrado' });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Fallo: Instrumento no borrado',
    });
  }
});

router.put('/update', async (req, res) => {
  try {
    const respuesta = await updateInstrument(req.body);
    res.status(200).json({
      status: 200,
      data: respuesta,
      message: 'Instrumento actualizado',
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/all', async (req, res) => {
  try {
    const respuesta = await getInstruments();
    res.status(200).json({
      status: 200,
      data: respuesta,
      message: 'data obtenida',
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  res.send('Estas en instrumentos');
});

module.exports = router;
