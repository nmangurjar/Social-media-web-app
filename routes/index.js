var express = require('express');
var router = express.Router();
const userModel = require("./users.js");
const passport = require('passport');


router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/profile',isLoggedIn , function(req, res, next) {
  res.render('index');
});
// router.post('/register', async function(req, res, next) {
//   var user = await userModel.create({
//     username : req.body.username,
//     email : req.body.email ,
//     password : req.body.password,
//     picture : req.body.picture,
//     age : req.body.age,
//     likes : 0
//   })
//   res.redirect("/user")
// });
router.post('/register',function(req,res,next){
  var newUser = new userModel({
    username : req.body.username,
         email : req.body.email ,
         picture : req.body.picture,
         age : req.body.age,
         likes : 0
  })
  userModel.register(newUser , req.body.password)
   .then(function(u){
     passport.authenticate('local')(req,res,function(){
      res.redirect("/profile")
     })
   })

})
router.post("/login",passport.authenticate('local'),function(req,res,next){});

router.get("/logout",function(req,res,next){
  req.logout();
  res.redirect('/profile')
})

function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next()
}
else {
  res.redirect('/profile')
}
}

router.get('/user', async function(req, res, next) {
  const allusers = await userModel.find()
  res.render('user',{ allusers });
});
router.get('/liked/:username', async function(req, res, next) {
  var userliked = await userModel.findOne({username : req.params.username})
  userliked.likes = userliked.likes + 1;
  await userliked.save()

  res.redirect("/user")


});



module.exports = router;
