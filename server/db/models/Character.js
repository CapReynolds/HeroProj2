const Sequelize = require('sequelize');
const { db } = require('../index');

const Character = db.define('character', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      char_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imagePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      attribution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
});

module.exports = Character;
