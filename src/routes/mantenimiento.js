const express = require('express');
const router = express.Router();
const {
  getMaintenances,
  getMaintenanceByID,
  insertMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require('../helpers/manteniemiento');

router.post('/new', async (req, res) => {
  try {
    const respuesta = await insertMaintenance(req.body);
    res
      .status(200)
      .json({
        status: 200,
        data: respuesta,
        message: 'Mantenimiento registrado',
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
    const respuesta = await deleteMaintenance(req.params.id);
    res
      .status(200)
      .json({
        status: 200,
        data: respuesta,
        message: 'Mantenimiento eliminado',
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Mantenimiento no eliminado',
    });
  }
});

router.put('/update', async (req, res) => {
  try {
    const respuesta = await updateMaintenance(req.body);
    res
      .status(200)
      .json({
        status: 200,
        data: respuesta,
        message: 'Mantenimiento actualizado',
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Mantenimiento no actualizado',
    });
  }
});

router.get('/all', async (req, res) => {
  try {
    const respuesta = await getMaintenances();
    res
      .status(200)
      .json({
        status: 200,
        data: respuesta,
        message: 'Mantenimientos obtenidos',
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Fallo: Mantenimientos no obtenidos',
    });
  }
});

router.get('/', async (req, res) => {
  res.send('Estas en mantenimiento');
});

module.exports = router;
