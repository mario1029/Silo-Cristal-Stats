const queries = {
  GET_INSTRUMENTS: `SELECT * FROM instrumento`,
  GET_INSTRUMENT_BY_ID: `SELECT * FROM instrumento WHERE codigo_instrumento = $1`,
  NEW_INSTRUMENT: `INSERT INTO instrumento (nombre, estado) VALUES ($1, $2) RETURNING *`,
  UPDATE_INSTRUMENT: `UPDATE instrumento SET nombre= $2, estado= $3, productividad_dia=$4, productividad_semana =$5 WHERE codigo_instrumento =$1 RETURNING *`,
  UPDATE_INSTRUMENT_PRODUCTIVITY_DAY: `UPDATE instrumento SET productividad_dia=$2 WHERE codigo_instrumento =$1 RETURNING *`,
  UPDATE_INSTRUMENT_PRODUCTIVITY_WEEK: `UPDATE instrumento SET productividad_semana=$2 WHERE codigo_instrumento =$1 RETURNING *`,
  DELETE_INSTRUMENT: `DELETE FROM instrumento WHERE codigo_instrumento =$1`,

  GET_ACTIVITYS: `SELECT * FROM actividad`,
  GET_ACTIVITYS_BY_CODE: `SELECT * FROM actividad WHERE codigo_instrumento =$1`,
  NEW_ACTIVITY: `INSERT INTO actividad (codigo_instrumento,hora_inicio,hora_fin) VALUES ($1, CAST ($2 AS TIME), CAST ($3 AS TIME)) RETURNING *`,
  UPDATE_ACTIVITY: `UPDATE actividad SET codigo_instrumento=$2, hora_inicio= CAST($3 AS TIME), hora_fin=CAST($4 AS TIME), fecha= CAST($5 AS DATE) WHERE codigo_actividad= $1 RETURNING *`,
  DELETE_ACTIVITY: `DELETE FROM actividad WHERE codigo_actividad=$1`,

  GET_MAINTENANCES: `SELECT * FROM mantenimiento`,
  GET_MAINTENANCES_BY_CODE: `SELECT * FROM mantenimiento WHERE codigo_instrumento =$1`,
  NEW_MAINTENANCE: `INSERT INTO mantenimiento (codigo_instrumento,hora_inicio,hora_fin, motivo) VALUES ($1, CAST ($2 AS TIME), CAST ($3 AS TIME), $4) RETURNING *`,
  UPDATE_MAINTENANCE: `UPDATE mantenimiento SET codigo_instrumento=$2, hora_inicio= CAST($3 AS TIME), hora_fin=CAST($4 AS TIME), fecha= CAST($5 AS DATE), motivo=$6 WHERE codigo_mantenimiento= $1 RETURNING *`,
  DELETE_MAINTENANCE: `DELETE FROM mantenimiento WHERE codigo_mantenimiento=$1`,

  GET_LOSES: `SELECT * FROM falla`,
  GET_LOSES_BY_CODE: `SELECT * FROM falla WHERE codigo_instrumento =$1`,
  NEW_LOSS: `INSERT INTO falla (codigo_instrumento,hora_inicio,hora_fin, motivo, perdida) VALUES ($1, CAST ($2 AS TIME), CAST ($3 AS TIME), $4, $5) RETURNING *`,
  UPDATE_LOSS: `UPDATE falla SET codigo_instrumento=$2, hora_inicio= CAST($3 AS TIME), hora_fin=CAST($4 AS TIME), fecha= CAST($5 AS DATE), motivo=$6, perdida=$7 WHERE codigo_error= $1 RETURNING *`,
  DELETE_LOSS: `DELETE FROM falla WHERE codigo_error=$1`,
};

module.exports = queries;
