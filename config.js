
const expressSession = require('express-session')
const Memorystore = require('memorystore')(expressSession)

const mysqlConfig={

  user : 'root',
  password : '0000',
  database : 'main_db'
};

let life = 60 * 60 * 1000
const sessionConfig = expressSession(
  {
      secret: "yangminseok-bad-boy",
      resave: false,
      saveUninitialized: true ,
      store: new Memorystore({
          checkPeriod: life
      }),
      cookie:{
          maxAge: life
      }
  })

// 
module.exports = {
  mysqlConfig,
  sessionConfig,
};