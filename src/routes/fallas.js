const express = require('express');
const router = express.Router();
const {
  getLoses,
  getLossByID,
  insertLoss,
  updateLoss,
  deleteLoss,
} = require('../helpers/fallas');

router.post('/new', async (req, res) => {
  try {
    const respuesta = await insertLoss(req.body);
    res
      .status(200)
      .json({ status: 200, data: respuesta, message: 'Falla registrada' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Falla no registrada',
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const respuesta = await deleteLoss(req.params.id);
    res
      .status(200)
      .json({ status: 200, data: respuesta, message: 'Falla eliminada' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Falla no eliminada',
    });
  }
});

router.put('/update', async (req, res) => {
  try {
    const respuesta = await updateLoss(req.body);
    res
      .status(200)
      .json({ status: 200, data: respuesta, message: 'Falla actualizada' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Falla no actualizada',
    });
  }
});

router.get('/all', async (req, res) => {
  try {
    const respuesta = await getLoses();
    res
      .status(200)
      .json({ status: 200, data: respuesta, message: 'Fallas obtenidas' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Fallas no obtenidas',
    });
  }
});

router.get('/', async (req, res) => {
  res.send('Estas en fallas');
});

module.exports = router;
