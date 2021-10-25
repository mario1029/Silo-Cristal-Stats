const Pool = require('../utils/pool');
const queries = require('../utils/queries');

const pool = Pool.getInstance();

const getMaintenances = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.GET_MAINTENANCES)).rows;
    const activitys = response.map((row) => {
      return {
        codigo_mantenimiento: row.codigo_mantenimiento,
        codigo_instrumento: row.codigo_instrumento,
        hora_inicio: row.hora_inicio,
        hora_fin: row.hora_fin,
        fecha: row.fecha,
        motivo: row.motivo,
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

const getMaintenanceByID = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.GET_MAINTENANCES_BY_CODE, [id])
    ).rows[0];
    const activity = {
      codigo_mantenimiento: response.codigo_mantenimiento,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
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

const insertMaintenance = async (body) => {
  const client = await pool.connect();
  const { codigo_instrumento, hora_inicio, hora_fin } = body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.NEW_MAINTENANCE, [
        codigo_instrumento,
        hora_inicio,
        hora_fin,
      ])
    ).rows[0];
    const activity = {
      codigo_mantenimiento: response.codigo_mantenimiento,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
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

const updateMaintenance = async (body, id) => {
  const client = await pool.connect();
  const {
    codigo_mantenimiento,
    codigo_instrumento,
    hora_inicio,
    hora_fin,
    fecha,
    motivo,
  } = body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.UPDATE_MAINTENANCE, [
        codigo_mantenimiento,
        codigo_instrumento,
        hora_inicio,
        hora_fin,
        fecha,
        motivo,
      ])
    ).rows[0];
    const activity = {
      codigo_mantenimiento: response.codigo_mantenimiento,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
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

const deleteMaintenance = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response =
      (await client.query(queries.DELETE_MAINTENANCE, [id])).rows[0] > 0;
    const activity = {
      codigo_mantenimiento: response.codigo_mantenimiento,
      codigo_instrumento: response.codigo_instrumento,
      hora_inicio: response.hora_inicio,
      hora_fin: response.hora_fin,
      fecha: response.fecha,
      motivo: response.motivo,
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
  getMaintenances,
  getMaintenanceByID,
  insertMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
