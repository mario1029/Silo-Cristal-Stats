const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Estas en mantenimiento');
});

module.exports = router;
