const express = require('express')
const session = require('express-session');
const mysql = require('mysql');
const { mysqlConfig} = require('../config');
const crypto = require('crypto');
const secret = 'MySecrekey1$1$234';
const connection = mysql.createConnection(mysqlConfig);
const router = express.Router();

router.get('/login', (req, res) => {
  if (req.session.is_logined) {
    res.redirect('/');
    
  } else {
    res.render('login');
  }
});

router.post('/login', (req, res) => {
  const body = req.body;
  const id = body.id;
  const pw = body.password;
  const hashed = crypto.createHmac('sha256',secret).update(pw).digest('hex');

  connection.query('SELECT * FROM Users WHERE id=?', [id], (err, data) => {
    if (data.length > 0 && hashed === data[0].password) {
      console.log('로그인 성공');
      req.session.is_logined = true;
      req.session.name = data[0].name;
      req.session.user_id = data[0].id;
      req.session.pw = hashed;
      req.session.save(function () {
        res.render('main', {
          name: data[0].name,
          id: data[0].id,
          is_logined: true,
        });
      });
      
    } else {
      res.send("<script>alert('로그인에 실패하였습니다.'); window.location.replace('login');</script>");
    }
  });
});

module.exports = router