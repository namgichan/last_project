const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const {sessionConfig } = require('./config');
const mqtt = require("mqtt");
const client = mqtt.connect("http://192.168.0.45");

const mainrouter = require('./Router/main');
const loginrouter = require('./Router/login');
const joinrouter = require('./Router/join');
const logoutrouter = require('./Router/logout');
const li = require('./Router/list');
const wr = require('./Router/write');
const ed = require('./Router/edit');
const del = require('./Router/delete');
const vi = require('./Router/view');
const service_set = require('./Router/service_set')
const service = require('./Router/service')



const app = express();


// 뷰 엔진 설정
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// MySQL 연결 설정

app.use(express.static(path.join(__dirname, '/public')));
// 세션 미들웨어 설정
app.use(sessionConfig);

// 바디 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터 설정
//메인
app.use('/', mainrouter);
//로그인
app.use('/', loginrouter);
//회원가입
app.use('/', joinrouter);
//로그아웃
app.use('/', logoutrouter);
//게시판 CRUD
app.use('/', li);
app.use('/', wr);
app.use('/', ed);
app.use('/', del);
app.use('/', vi);
app.use('/',service_set);
app.use('/',service);


let read_chair_data = '{"0": 0, "1": 15, "2": 0, "3": 114, "4": 6, "5": 120, "6": 130, "7": 140, "8": 150, "9": 160, "10": 0, "11": 170, "12": 0, "13": 180, "14": 0, "15": 200, "16": 0, "17": 180, "18": 0, "19": 170, "20": 0, "21": 150, "22": 140, "23": 130, "24": 100, "25": 80, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0}';

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
  res.send(JSON.parse(read_chair_data))
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