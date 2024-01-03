const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { mysqlConfig} = require('../config');
const connection = mysql.createConnection(mysqlConfig);

router.get('/view/:num', (req, res) => {
  if (req.session.is_logined == true)
  {
    connection.query('SELECT * FROM board WHERE num = ?', [req.params.num], function (err, result) {
      if (err) throw err;
  
      res.render('view', { data: result });
    });
  }
  else
  {
    res.send("<script>alert('로그인 권한이 필요합니다.'); window.location.replace('/login');</script>")
  }
  
});



module.exports = router;