const session = require('express-session');
const FileStore = require('session-file-store')(session);


const mysqlConfig={

  user : 'root',
  password : '0000',
  database : 'main_db'
};

const sessionConfig ={
  secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
  resave: true, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
  saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
  store : new FileStore() // 세션이 데이터를 저장하는 곳
};

module.exports = {
  mysqlConfig,
  sessionConfig,
};