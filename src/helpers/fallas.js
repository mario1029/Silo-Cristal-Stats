const Pool = require('../utils/pool');
const queries = require('../utils/queries');

const pool = Pool.getInstance();

const getLoses = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.GET_LOSES)).rows;
    const activitys = response.map((row) => {
      return {
        codigo_error: row.codigo_error,
        codigo_instrumento: row.codigo_instrumento,
        hora_inicio: row.hora_inicio,
        hora_fin: row.hora_fin,
        fecha: row.fecha,
        motivo: row.motivo,
        perdida: row.perdida,
      };
    });
    await client.query('COMMIT');
    return activitys;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const getLossByID = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.GET_LOSES_BY_CODE, [id]))
      .rows[0];
    const activity = {
      codigo_error: response.codigo_error,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
      perdida: response.perdida,
    };
    await client.query('COMMIT');
    return activity;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const insertLoss = async (body) => {
  const client = await pool.connect();
  const { codigo_instrumento, hora_inicio, hora_fin, motivo, perdida } = body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.NEW_LOSS, [
        codigo_instrumento,
        hora_inicio,
        hora_fin,
        motivo,
        perdida,
      ])
    ).rows[0];
    const activity = {
      codigo_error: response.codigo_error,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
      perdida: response.perdida,
    };
    await client.query('COMMIT');
    return activity;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const updateLoss = async (body) => {
  const client = await pool.connect();
  const {
    codigo_error,
    codigo_instrumento,
    hora_inicio,
    hora_fin,
    fecha,
    motivo,
    perdida,
  } = body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.UPDATE_LOSS, [
        codigo_error,
        codigo_instrumento,
        hora_inicio,
        hora_fin,
        fecha,
        motivo,
        perdida,
      ])
    ).rows[0];
    const activity = {
      codigo_error: response.codigo_error,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
      perdida: response.perdida,
    };
    await client.query('COMMIT');
    return activity;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const deleteLoss = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response =
      (await client.query(queries.DELETE_LOSS, [id])).rows[0] > 0;
    const activity = {
      codigo_error: response.codigo_error,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
      peridida: response.perdida,
    };
    await client.query('COMMIT');
    return activity;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  getLoses,
  getLossByID,
  insertLoss,
  updateLoss,
  deleteLoss,
};
