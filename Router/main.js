const express = require('express')
const router = express.Router();


router.get('', (req, res) => {
  if (req.session.is_logined == true) {
    res.render('main', {
      is_logined: req.session.is_logined,
      name: req.session.name,
    });
  } else {
    res.render('main', {
      is_logined: false,
    });
  }
});

module.exports = router