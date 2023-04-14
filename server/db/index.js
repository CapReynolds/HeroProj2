/* eslint no-console: 'off' */
/* eslint comma-dangle: 'off' */

const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/hero_proj2_db', {
  logging: false,
});

const initDB = async () => {
  try {
    //await db.sync({ force: true });
    console.log('connected and initialized');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { db, initDB };
