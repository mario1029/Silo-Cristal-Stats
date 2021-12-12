const express = require('express');
const router = express.Router();
const {
  getActivitys,
  getActivityByID,
  insertActivity,
  updateActivity,
  deleteActivity,
} = require('../helpers/actividades');

router.post('/new', async (req, res) => {
  try {
    const respuesta = await insertActivity(req.body);
    res.status(200).json({
      status: 200,
      data: respuesta,
      message: 'Actividad registrada',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Mantenimiento no registrado',
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const respuesta = await deleteActivity(req.params.id);
    res.status(200).json({
      status: 200,
      data: respuesta,
      message: 'Actividad eliminada',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Actividad no eliminada',
    });
  }
});

router.put('/update', async (req, res) => {
  try {
    const respuesta = await updateActivity(req.body);
    res.status(200).json({
      status: 200,
      data: respuesta,
      message: 'Actividad actualizada',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Actividad no actualizada',
    });
  }
});

router.get('/all', async (req, res) => {
  try {
    const respuesta = await getActivitys();
    res.status(200).json({
      status: 200,
      data: respuesta,
      message: 'Actividades obtenidas',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Actividades no obtenidas',
    });
  }
});

router.get('/', async (req, res) => {
  res.send('Estas en actividades');
});

module.exports = router;
