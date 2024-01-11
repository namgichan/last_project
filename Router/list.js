const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { mysqlConfig } = require('../config');
const connection = mysql.createConnection(mysqlConfig);
const fs = require('fs');


router.get('/list/:cur', (req, res) => {
  if (req.session.is_logined == true) {
    var page_size = 5;
    var page_list_size = 10;
    
    var curPage = parseInt(req.params.cur);

    var no = "";

    connection.query('SELECT COUNT(*) AS cnt FROM board;', (error, data) => {
      if (error) {
        res.send(error);
      } else {
        var totalPageCount = data[0].cnt;

        if (totalPageCount < 0) {
          totalPageCount = 0;
        }
      }

      var totalPage = Math.ceil(totalPageCount / page_size);
      var totalSet = Math.ceil(totalPage / page_list_size);
      var curSet = Math.ceil(curPage / page_list_size);
      var startPage = ((curSet - 1) * 10) + 1;
      var endPage = (startPage + page_list_size) - 1;

      if (curPage < 0) {
        no = 0;
      } else {
        no = (curPage - 1) * page_size;
      }

      var result2 = {
        "curPage": curPage,
        "page_list": page_list_size,
        "page_size": page_size,
        "totalPage": totalPage,
        "totalSet": totalSet,
        "curSet": curSet,
        "startPage": startPage,
        "endPage": endPage
      };

      fs.readFile('views/list.ejs', 'utf-8', function (error, fileContent) {
        if (error) {
          console.log("ejs오류" + error);
          return;
        }
        console.log("현재 페이지 정보:", result2)

        connection.query('SELECT * FROM board ORDER BY num ASC LIMIT ?, ?', [no, page_size], function (error, result) {
          if (error) {
            console.log("페이징 에러" + error);
            return;
          }

          res.render('list',{
            data: result,
            list: result2
          });
        });
      });
    });
  } else {
    res.send("<script>alert('로그인 권한이 필요합니다.'); window.location.replace('/login');</script>")
  }
});

module.exports = router;