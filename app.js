const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const path = require('path');
const {sessionConfig } = require('./config');
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://192.168.0.45");


const mainrouter = require('./Router/main');
const loginrouter = require('./Router/login');
const joinrouter = require('./Router/join');
const logoutrouter = require('./Router/logout');
const li = require('./Router/list');
const wr = require('./Router/write');
const ed = require('./Router/edit');
const del = require('./Router/delete');
const vi = require('./Router/view');
const mau = require('./Router/about')
const service_set = require('./Router/service_set')
const service = require('./Router/service')


const app = express();

app.use(express.static('public'));
// 세션 미들웨어 설정
app.use(sessionConfig);

// 바디 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 뷰 엔진 설정
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// express 기능과 소켓 통신을 제공하는 http 서버 만들기
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const sio = socket(server) ;
let read_chair_data;




// 라우터 설정
//메인
app.use('', mainrouter);
//로그인
app.use('', loginrouter);
//회원가입
app.use('', joinrouter);
//로그아웃
app.use('', logoutrouter);
//게시판 CRUD
app.use('', li);
app.use('', wr);
app.use('', ed);
app.use('', del);
app.use('', vi);
app.use('',service_set);
app.use('',service);
app.use('',mau);

// 커넥트 이벤트 핸들링
client.on("connect", () => { 
  console.log("mqtt connected");
  client.subscribe("serial_receive_data");
});
// 구독하고 있는 토픽이 왔을 때 이벤트 핸들링
client.on("message", (_, message) => {
  read_chair_data = String(message)
  console.log(read_chair_data)
})
app.get("/test_value", (req, res) => {
  console.log(JSON.parse(read_chair_data))
  res.send(read_chair_data)
})

app.post("/test_value", (req, res) => {
  console.log(JSON.parse(read_chair_data));
  res.json(JSON.parse(read_chair_data));
});


app.all('/*', (request, response) => {
  response.status(404).json({
    status: 404,
    message: '잘못된 요청입니다!',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});