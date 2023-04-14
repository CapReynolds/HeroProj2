const Sequelize = require('sequelize');
const {db} = require('../index');

const Team = db.define('team', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // teamMember: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },
});

module.exports = Team;