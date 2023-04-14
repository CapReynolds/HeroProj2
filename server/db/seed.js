/* eslint no-console : 'off' */

const { db } = require('./index');

const {
  models: {
    Team, Character,
  },
} = require('./models/associations');

const syncAndSeed = async () => {
 
  try {
    await db.sync({ force: true });

    await Promise.all([
      Team.create({
        name: 'TestTeam',
        username: 'TestUser1',
      }),

      Team.create({
        name: 'TestTeam',
        username: 'TestUser2',
      }),
      
      Team.create({
        name: 'TestTeam',
        username: 'TestUser3',
      }),

      Team.create({
        name: 'TestTeam',
        username: 'TestUser4',
      }),
      
      Team.create({
        name: 'TestTeam',
        username: 'TestUser5',
      }),

      Team.create({
        name: 'TestTeam',
        username: 'TestUser6',
      }),
      Team.create({
        name: 'TestTeam',
        username: 'TestUser6',
      }),
      Team.create({
        name: 'TestTeam',
        username: 'TestUser8',
      }),
      Team.create({
        name: 'TestTeam',
        username: 'TestUser9',
      }),
      Team.create({
        name: 'TestTeam',
        username: 'TestUser7',
      }),
      Team.create({
        name: 'TestTeam',
        username: 'TestUser17',
      }),
      Team.create({
        name: 'TestTeam',
        username: 'TestUser19',
      }),
    ]
    );


    await Promise.all([
      Team.create({
        name: 'TestTeam1',
        username: 'TestUser1',
      }),

      Team.create({
        name: 'TestTeam2',
        username: 'TestUser2',
      }),
  
      
      
      Character.create({
        char_id: 1,
        name: 'TestHero1',
        imagePath: 'null',
        description: 'A test description',
        attribution: 'A Test',
      }),

      Character.create({
        char_id: 2,
        name: 'TestHero2',
        imagePath: 'null',
        description: 'A test description',
        attribution: 'A Test',
      }),

      Character.create({
        char_id: 3,
        name: 'TestHero3',
        imagePath: 'null',
        description: 'A test description',
        attribution: 'A Test',
      }),

      Character.create({
        char_id: 4,
        name: 'TestHero4',
        imagePath: 'null',
        description: 'A test description',
        attribution: 'A Test',
      }),

      Character.create({
        char_id: 5,
        name: 'TestHero5',
        imagePath: 'null',
        description: 'A test description',
        attribution: 'A Test',
      }),

    ]).then(([TestTeam1, TestTeam2, TestHero1, TestHero2, TestHero3, TestHero4, TestHero5])=> {
      return Promise.all([
        TestHero1.setTeams(TestTeam1),
        TestHero2.setTeams(TestTeam1),
        TestHero3.setTeams(TestTeam1),
        TestHero4.setTeams(TestTeam1),
        TestHero5.setTeams(TestTeam1),
        TestHero5.setTeams(TestTeam2),
      ])
    });

    const team = await Team.findAll({
      include: Character
    });
    //console.log(team, 'team');

    const characters = await Character.findAll({
      include: Team
    });

    
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = syncAndSeed;
