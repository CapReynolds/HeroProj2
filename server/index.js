// Server setup
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");

const Sequelize = require('sequelize');
const syncAndSeed = require('./db/seed');

const {
    models: {
      Team, Character,
    },
  } = require('./db/models/associations');

//postgres setup
// const pg = require("pg");
// const client = new pg.Client('postgres://localhost/hero_proj2_db');

// const setPG = async() => {
//     try{
//         await client.connect();
//         console.log("Connected to database");
//     }
//     catch(ex){
//         console.log(ex);
//     }
// }

// setPG();

//Sequelize 
const db =  new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/hero_proj2_db', {
    logging: false,
    
});

const initDB = async ()=>{
    try {
        await db.sync({ force: true});
        console.log("Connected to database");
        syncAndSeed();
    }
    catch(ex) {
        console.log(ex);
    }
}

//process env
require('dotenv').config()

const MD5 = require("crypto-js/md5");
const request = require("request");
//console.log(MD5("Message").toString());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Middleware Logging
app.use(morgan("dev"));

// Api Routes

app.get("/api/getcharacters", async(req,res,next) => {
    try{
        const {val} = req.query;

        let hero = {
            id: 0,
            status: "good",
            name: '',
            imagePath: '',
            description: '',
            attributionHTML: '',
            attributionText: '',
            comics: {},
            series: {},
            urls: [],
            stories: {},
            furtherReading: ''
        };

        let standard_xlarge	= "standard_xlarge";

        let ts = Date.now();
        let hash = MD5(ts + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY).toString();
        
        let baseURL = `https://gateway.marvel.com:443/v1/public/characters?&ts=${ts}&apikey=1bcba7b8a4173f5c0c14e07aabcc4374&hash=${hash}&name=${val}`
        
       
        request({url: baseURL}, (error, response) => {
            if(response != undefined){
                const result = JSON.parse(response.body);
            
                
                if(result.code === 200){
                    //all good
                    let tmp = result.data.results[0];
                    if(tmp){
                        
    
                        hero.id = tmp.id;
                        hero.imagePath = `${tmp.thumbnail.path}/${standard_xlarge}.${tmp.thumbnail.extension}`;
                        hero.name = tmp.name;
                        hero.description = (tmp.description != '' ? tmp.description : 'No description available');
                        hero.attributionText = result.attributionText;
                        hero.attributionHTML = result.attributionHTML;
    
                        hero.comics = tmp.comics;
                        hero.series = tmp.series;
                        hero.urls = tmp.urls;
                        hero.stories = tmp.stories;
                        hero.furtherReading = tmp.urls[0].url;
                        //need to revise if multiple results
                    
                    }
                    else{
                        hero.status= "error";
                    }
                    res.send(hero);
                }
                
            }
            else {
                //send back error message
                hero.status= "error";
                res.send(hero)
            }
        })
    }
    catch(ex){
        next(ex);
    }
})

//api route for inserting new characters
//check if characters are in the db, if not create them, if they are
//add the team to them

app.post('/api/saveRoster', async(req,res,next) =>{
    try {

        //to remove any special characters
        function TrimCheck(testObj){
            const regex = /[@~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g;

            for(const prop in testObj){
                if(prop != 'roster')
                    testObj[prop] = testObj[prop].replace(regex, "").trim();
            }
        }

        if (!req.body) res.sendStatus(400);

        await db.sync({ force: true });

        const {name, username, roster} = req.body;

        const obj = {
            name, 
            username,
            roster,
        }

        TrimCheck(obj);

        const returnedTeam = [];

        let team = await Team.create({
            name: name,
            username: username
        });
        let char = {};

        for(let i = 0; i < roster.length; i++ ){

            char = await Character.create({
                name: roster[i].name,
                char_id: roster[i].id,
                imagePath: roster[i].imagePath,
                description: roster[i].description,
                attribution: roster[i].attributionText
            });

            char.setTeams(team);
            returnedTeam.push(char);
        }

        // const allcharacters = await Character.findAll({
        //     include: Team
        // });

        
        res.status(201).send(returnedTeam);
    }
    catch(ex){
        console.log(ex);
    }
})

app.get('/api/getTeams', async(req,res,next) =>{
    try {
        const {val} = req.query;
        console.log(val);
        const returnedTeam = await Team.findAll({
            where: {
                name: val,
            },
            include: Character
        });

        const allTeams2 = await Team.findAll({
            include: Character
        });

        console.log(returnedTeam);
        //console.log(allTeams2, 'allTeams2');

        res.status(201).send(returnedTeam);
    }
    catch(err)
    {
        console.log(err);
    }

});

// Send the app
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || "Internal server error");
});

app.listen(PORT, () =>
    console.log(`
        Listening on Port ${PORT}
        http://localhost:${PORT}
`),
);

initDB();
module.exports = { app, PORT };
