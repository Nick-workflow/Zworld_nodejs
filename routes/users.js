var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/judgeName', function(req, res, next) {
  var param = req.query;
  if(param.account == "11111111111"){
    res.send("用户不存在");
  }else{
    res.send("");
  }
});

router.get('/login',function(req, res, next){
    var data = req.query;
    if(data.account == "18668686688" && data.pwd == "888888"){
        res.send("登录成功");
    }else{
        res.send("登录失败");
    }
});


module.exports = router;
