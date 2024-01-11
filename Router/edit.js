const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { mysqlConfig } = require('../config');
const connection = mysql.createConnection(mysqlConfig);

router.use(express.urlencoded({ extended: true }));

router.get('/edit/:num', function (req, res) {
  if (req.session.is_logined == true)
  {
    connection.query('SELECT * FROM board WHERE num = ?', [req.params.num], function (err, result) {
      if (err) throw err;
  
      res.render('edit', { data: result[0] });
    });
  }
  else
  {
    res.send("<script>alert('로그인 권한이 필요합니다.'); window.location.replace('login');</script>")
  }
  
});

router.post('/edit/:num', function (req, res) {
  const body = req.body;
  const num = req.params.num;
  const subject = body.subject || '';
  const content = body.content || '';

  connection.query(
    'UPDATE board SET subject=?, content=? WHERE num=?',
    [subject, content, num],
    function (err, result) {
      if (err) throw err;

      res.redirect(`/view/${num}`);
    }
  );
});

module.exports = router;