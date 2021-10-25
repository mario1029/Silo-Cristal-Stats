const Pool = require('../utils/pool');
const queries = require('../utils/queries');

const pool = Pool.getInstance();

const getInstruments = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.GET_INSTRUMENTS)).rows;
    const instruments = response.map((row) => {
      return {
        codigo_instrumento: row.codigo_instrumento,
        nombre: row.nombre,
        estado: row.estado,
        productividad_dia: row.productividad_dia,
        productividad_semana: row.productividad_semana,
      };
    });
    await client.query('COMMIT');
    return instruments;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const getInstrumentByID = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.GET_INSTRUMENT_BY_ID, [id]))
      .rows[0];
    const instrument = {
      codigo_instrumento: response.id_producto,
      nombre: response.nombre,
      estado: response.estado,
      productividad_dia: response.productividad_dia,
      productividad_semana: response.productividad_semana,
    };
    await client.query('COMMIT');
    return instrument;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const insertInstrument = async (body) => {
  const client = await pool.connect();
  const { nombre, estado } = body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.NEW_INSTRUMENT, [nombre, estado])
    ).rows[0];
    const instrument = {
      codigo_instrumento: response.codigo_instrumento,
      nombre: response.nombre,
      estado: response.estado,
      productividad_dia: response.productividad_dia,
      productividad_semana: response.productividad_semana,
    };
    await client.query('COMMIT');
    return instrument;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const updateInstrument = async (body, id) => {
  const client = await pool.connect();
  const {
    codigo_instrumento,
    nombre,
    estado,
    productividad_dia,
    productividad_semana,
  } = body;
  try {
    await client.query('BEGIN');
    const response = (
      await client.query(queries.UPDATE_INSTRUMENT, [
        codigo_instrumento,
        nombre,
        estado,
        productividad_dia,
        productividad_semana,
      ])
    ).rows[0];
    const instrument = {
      codigo_instrumento: response.codigo_instrumento,
      nombre: response.nombre,
      estado: response.estado,
      productividad_dia: response.productividad_dia,
      productividad_semana: response.productividad_semana,
    };
    await client.query('COMMIT');
    return instrument;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

const deleteInstrument = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response =
      (await client.query(queries.DELETE_INSTRUMENT, [id])).rows[0] > 0;
    const instrument = {
      codigo_instrumento: response.codigo_instrumento,
      nombre: response.nombre,
      estado: response.estado,
      productividad_dia: response.productividad_dia,
      productividad_semana: response.productividad_semana,
    };
    await client.query('COMMIT');
    return instrument;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  getInstruments,
  getInstrumentByID,
  insertInstrument,
  updateInstrument,
  deleteInstrument,
};
