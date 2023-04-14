const {Sequelize, DataTypes} = require('sequelize');

const {db} = require('../index');

const TeamMember = db.define('teamMember', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

module.exports = TeamMember;