const express = require('express')
const mysql = require('mysql');
const router = express.Router();
const { mysqlConfig} = require('../config');
const connection = mysql.createConnection(mysqlConfig)
const crypto = require('crypto');
const secret = 'MySecrekey1$1$234';

router.get('/join', (req, res) => {
  if (req.session.is_logined) {
    res.redirect('/');
  } else {
    res.render('join');
  }
});


router.post('/join', (req, res) => {
  const body = req.body;
  const name = body.name;
  const id = body.id;
  const pw = body.password;
  const hashed = crypto.createHmac('sha256',secret).update(pw).digest('hex');
  
  const email = body.email;
  

  connection.query('SELECT * FROM Users WHERE id=?', [id], (err, data) => {
    if (data.length === 0) {
      
      connection.query(
        'INSERT INTO Users(name, id, password, email) VALUES (?, ?, ?, ?)',
        [name, id, hashed, email],
        (insertErr) => {
          if (insertErr) throw insertErr;
          console.log('회원가입 성공');
          
          res.send("<script>alert('회원가입에 성공하였습니다.'); window.location.replace('/login');</script>");
         
          
        }
      );
    } else {
      console.log('회원가입 실패');
      res.send("<script>alert('회원가입에 성공하였습니다.'); window.location.replace('/join');</script>");
      
      
    }
  });

});

module.exports = router