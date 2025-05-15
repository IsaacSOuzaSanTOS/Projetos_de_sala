const db = require('../config/db');

module.exports = {
  async create(data) {
    const query = 'INSERT INTO users (name, email, curso_id) VALUES ($1, $2, $3)';
    const values = [data.name, data.email, data.curso_id || null];
    return db.query(query, values);
  },

  async findAll() {
    const result = await db.query('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
  },

  async findAllComCurso() {
  const query = `
    SELECT users.id, users.name, users.email, curso.nome AS curso
    FROM users
    LEFT JOIN curso ON users.curso_id = curso.id
    ORDER BY users.id ASC
  `;
  const result = await db.query(query);
  return result.rows;
},

async findByCurso(curso_id) {
  const query = `
    SELECT users.id, users.name, users.email
    FROM users
    WHERE curso_id = $1
    ORDER BY name ASC
  `;
  const result = await db.query(query, [curso_id]);
  return result.rows;
},

  async update(id, data) {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
    const values = [data.name, data.email, id];
    return db.query(query, values);
  },

  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    return db.query(query, [id]);
  }
};

