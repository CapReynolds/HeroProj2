const Team = require('./Team');
//const TeamMember = require('./TeamMember.js');
const Character = require('./Character');

// Team
//Team.hasMany(TeamMember);

// Character Line Item
//Character.belongsTo(TeamMember);

//TeamMember
//TeamMember.belongsTo(Team);

Team.belongsToMany(Character, {through: 'TeamMembers'});
Character.belongsToMany(Team, {through: 'TeamMembers'});

module.exports = {
  models: {
    Character,
    Team,
    // TeamMember,
  },
};
