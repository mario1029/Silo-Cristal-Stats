const Pool = require('../utils/pool');
const queries = require('../utils/queries');

const pool = Pool.getInstance();

const getActivitys = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.GET_ACTIVITYS)).rows;
    const activitys = response.map((row) => {
      return {
        codigo_actividad: row.codigo_actividad,
        codigo_instrumento: row.codigo_instrumento,
        hora_inicio: row.hora_inicio,
        hora_fin: row.hora_fin,
        fecha: row.fecha,
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

const getActivityByID = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.GET_ACTIVITYS_BY_CODE, [id]))
      .rows[0];
    const activity = {
      codigo_actividad: response.codigo_actividad,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
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

const insertActivity = async (body) => {
  const client = await pool.connect();
  const { codigo_instrumento, hora_inicio, hora_fin } = body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.NEW_ACTIVITY, [
        codigo_instrumento,
        hora_inicio,
        hora_fin,
      ])
    ).rows[0];
    const activity = {
      codigo_actividad: response.codigo_actividad,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
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

const updateActivity = async (body) => {
  const client = await pool.connect();
  const { codigo_actividad, codigo_instrumento, hora_inicio, hora_fin, fecha } =
    body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.UPDATE_ACTIVITY, [
        codigo_actividad,
        codigo_instrumento,
        hora_inicio,
        hora_fin,
        fecha,
      ])
    ).rows[0];
    const activity = {
      codigo_actividad: response.codigo_actividad,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
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

const deleteActivity = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response =
      (await client.query(queries.DELETE_ACTIVITY, [id])).rows[0] > 0;
    const activity = {
      codigo_actividad: response.codigo_actividad,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
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
  getActivitys,
  getActivityByID,
  insertActivity,
  updateActivity,
  deleteActivity,
};
