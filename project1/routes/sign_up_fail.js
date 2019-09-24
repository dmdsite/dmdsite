var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign_up_fail', { title: 'Express' });
});

module.exports = router;
