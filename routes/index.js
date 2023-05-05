var express = require('express');
var router = express.Router();

const user = require("../model/userModel")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Home Page' });
});

router.get('/nav', function(req, res, next) {
  res.render('nav');
});

router.get('/usererror', function(req, res, next) {
  res.render('usererror');
});

router.get('/passerror', function(req, res, next) {
  res.render('passerror');
});

/* To Show The Signin Page */
router.get('/signin', function (req, res, next) {
  res.render('signin', { title: 'Signin' });
});

/* To Show The Signup Page */
router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Signup' });
});


/* To Post Signup Page Data */
router.post('/signup', function (req, res, next) {
  user.create(req.body)
    .then((createUser) => {
      res.redirect("/signin");
    })
    .catch(err => res.send(err));
});

 /* To Post Signin Page Data */

// router.post('/signin', function (req, res, next) {
//   const { username, password} = req.body;
//   user.findOne({ username})
//       .then((founduser) => {
//         res.redirect("/profile/" + founduser._id);
//       })
//       .catch((err) => res.send(err));

//   // res.render('signin', { title: 'Signin' });
// });

 /* To Post Signin Page Data */
router.post('/signin', function (req, res, next) {
  const { username, password } = req.body;
  user.findOne({username})
    .then((foundUser) => {

        if(!foundUser){
            // return res.send("User not found <a href='/signin'>Go Back</a>")
            return res.redirect("/usererror")
        }
        if(password !== foundUser.password){
            return res.redirect("/passerror")
        }
        // res.redirect("/profile/" + foundUser.username  )
        res.redirect("/profile/" + foundUser._id);

  }).catch((err) => res.send("NOT EMPTY"))
});



// This Route For Profile Page.
router.get("/profile/:id", function (req, res, next) {
  user.findById(req.params.id)
      .then((founduser) => {
        res.render("profile", { 
            title: founduser.username, 
            user: founduser
          });
      })
      .catch((err) => res.send(err));
});

// This Route For Delete User.
router.get("/delete/:id", function (req, res, next) {
  user.findByIdAndDelete(req.params.id)
      .then((founduser) => {
        res.redirect("/signin")
      })
      .catch((err) => res.send(err));
});

// This Route For Update Page.
router.get("/update/:id", function (req, res, next) {
  user.findById(req.params.id)
      .then((founduser) => {
        res.render("update", { 
            title: founduser.username, 
            user: founduser
          });
      })
      .catch((err) => res.send(err));
});

// This Route For Show Update Page.
router.post("/update/:id", function (req, res, next) {
  user.findByIdAndUpdate(req.params.id, req.body)
      .then((founduser) => {
          res.redirect("/profile/" + founduser._id);
      })
      .catch((err) => res.send(err));
});

// For Logout Page
router.get("/logout", function (req, res, next) {
  res.redirect("/signin");
});



/* To Read The All The Users in Database. */
router.get('/readall', function (req, res, next) {
  user.find()
      .then((users) => res.json(users))
      .catch((err) => res.send(err));
});

module.exports = router;
