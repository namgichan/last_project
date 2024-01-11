const express = require('express')
const router = express.Router();

router.get('/logout',(req,res)=>{
  console.log('로그아웃 성공');
  req.session.destroy(function(err){
      // 세션 파괴후 할 것들
      res.send("<script>alert('로그아웃 되었습니다.'); window.location.replace('/');</script>");
  });

});

module.exports = router