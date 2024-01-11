const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { mysqlConfig } = require('../config');
const connection = mysql.createConnection(mysqlConfig);

router.get('/write', (req, res) => {
  if (req.session.is_logined) {
    res.render('write');
  } else {
    res.send("<script>alert('로그인 권한이 필요합니다'); window.location.replace('login');</script>");
  }
});

router.post('/write', (req, res) => {
  if (!req.session.is_logined) {
    return res.send("<script>alert('로그인 권한이 필요합니다'); window.location.replace('login');</script>");
  }

  const { subject, content } = req.body;
  const author = req.session.user_id;

  if (!subject) {
    return res.send("<script>alert('제목을 입력하세요.'); window.location.replace('write');</script>");
  }

  const query = 'INSERT INTO board (subject, content, author) VALUES (?, ?, ?)';

  connection.query(query, [subject, content, author], (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.send("<script>alert('게시물 작성에 실패했습니다.'); window.location.replace('write');</script>");
    }

    res.redirect('/list/1');
  });
});

module.exports = router;
