const express = require('express');
const router = express.Router();
const actividades = require('./actividades');
const fallas = require('./fallas');
const instrumentos = require('./instrumentos');
const mantenimiento = require('./mantenimiento');

router.get('/', async (req, res) => {
  res.render('home');
});

router.use('/activity', actividades);
router.use('/fail', fallas);
router.use('/instrument', instrumentos);
router.use('/maintenance', mantenimiento);

module.exports = router;
