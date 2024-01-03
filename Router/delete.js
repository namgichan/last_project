const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { mysqlConfig} = require('../config');
const connection = mysql.createConnection(mysqlConfig);

router.get('/delete/:num', (req, res) => {

  if(req.session.is_logined == true)
  {
    connection.query('DELETE FROM board WHERE num=?', [req.params.num], function (error, results, fields) {
      if (error) {
        console.error(error);
        res.send(error);
        
      } else {
        res.redirect(`/list/1`);
      }
    });
  }
  else
  {
    res.send("<script>alert('로그인을 권한이 필요합니다.'); window.location.replace('/login');</script>")
  }
 
});

module.exports = router;