const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const con = require("./config/db");
const { error } = require("console");


app.use("/assets", express.static(path.join(__dirname, "assets")));

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '549065543383-jttamv1m6j7tgcvmfeor8o0g9qqa5qog.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/db');
  });

app.get('/', function(req, res) {
  res.render('pages/auth');
});
app.get("/home",function(req,res){
    res.sendFile(path.join(__dirname, "views/homepage.html"));
});
app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname, "views/login0.html"));
});
app.get("/login0",function(req,res){
    res.sendFile(path.join(__dirname, "views/login0.html"));
});
app.get("/listcourse",function(req,res){
    res.sendFile(path.join(__dirname, "views/listcourses.html"));
});
app.get("/search",function(req,res){
  res.sendFile(path.join(__dirname, "views/search.html"));
});
app.get("/community",function(req,res){
  res.sendFile(path.join(__dirname, "views/community.html"));
});
app.get("/bookmark",function(req,res){
  res.sendFile(path.join(__dirname, "views/bookmark.html"));
});
app.get("/notification",function(req,res){
  res.sendFile(path.join(__dirname, "views/noticommu.html"));
});
app.get("/db",function(req,res){
  res.sendFile(path.join(__dirname, "views/dashboard.html"));
});
app.get("/review",function(req,res){
  res.sendFile(path.join(__dirname, "views/review_courses.html"));
});
app.get("/course",function(req,res){
  res.sendFile(path.join(__dirname, "views/courses.html"));
});
app.get("/admin",function(req,res){
  res.sendFile(path.join(__dirname, "views/dashboardadmin.html"));
});
app.get("/listadmin",function(req,res){
  res.sendFile(path.join(__dirname, "views/admin_list.html"));
});
app.get("/commuadmin",function(req,res){
  res.sendFile(path.join(__dirname, "views/admincommu.html"));
});
app.get("/history",function(req,res){
  res.sendFile(path.join(__dirname, "views/history.html"));
});
app.get("/deletecommu",function(req,res){
  res.sendFile(path.join(__dirname, "views/commuadmin.html"));
});
app.get("/deletecomment",function(req,res){
  res.sendFile(path.join(__dirname, "views/courseadmin.html"));
});
app.get("/seelist",function(req,res){
  res.sendFile(path.join(__dirname, "views/listcourse1.html"));
});
app.get("/seesearch",function(req,res){
  res.sendFile(path.join(__dirname, "views/search1.html"));
});
app.get("/seecourse",function(req,res){
  res.sendFile(path.join(__dirname, "views/course1.html"));
});
app.get("/post",function(req,res){
  res.sendFile(path.join(__dirname, "views/post.html"));
});
app.get("/comment",function(req,res){
  res.sendFile(path.join(__dirname, "views/comment.html"));
});

const port = 3000;
app.listen(port,function(){
    console.log("Server is ready at " + port);
});