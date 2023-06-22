const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require("cors"); 
const app = express();
const fetch = require('cross-fetch');



// Add headers before the routes are defined
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


/*
* Получим список всех пользователей с параметрами
*/
(async () => {
  try {
    const res = await fetch('http://localhost:8082/users');         // Получим все записи
    if (res.status >= 400) {
      throw new Error("Сервер не ответил");
    }
    usersData = await res.json();    
  } catch (err) {
    console.error(err);
  }
})();


const port = 3000;


// app.use(require("express-session")({
//   secret: "hghtyNN23h",
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false },
//   cookie: { maxAge : 3600000 }
//   }));





app.use(session({
      secret: 'hghtyNN23h',
      store: new FileStore(),
      cookie: {
        path: '/',
        secure: false,
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 1000,
      },
      resave: true,
      saveUninitialized: true
    })
  );

  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




globalThis.userID = '';


passport.use(
  new LocalStrategy({ usernameField: 'username' }, function(
    username,
    password,
    done
  ) {                                                                                      //Проверяем введённые данные совпадения -->
    let agreement = '0';                                                                   // Флаг успешности проверки
    for (let i = 0; i <= usersData.length-1; i++) {      
          if (username === usersData[i]['login'] && password === usersData[i]['password']) {      // Если совпало - вернули i-пользователя
            agreement = 1;                                                                        // установили флаг, что всё Ок
            return done(null, usersData[i]);
          
          } else {
            continue;            
          }  
  }  
  if (agreement == 0) {return done(null, false); }                                                 // После цикла проверим, если флаг успеха не взведён - вернём false 
  })
);


passport.serializeUser(function(user, done) {  // console.log('Сериализация: ', user);
  // console.log('Сериализация: ', user);
  done(null, user.id);
  // userID = user;
});

passport.deserializeUser(function(user, done) {
  // console.log('Десериализация: ', user);
  // const user = userDB.id === id ? userDB : false;
  done(null, user);
});



app.use(passport.initialize());
app.use(passport.session());

// Создадим глобально пользователя, чтобы оперировать статусами из разных роутов
globalThis.currentUser = {
  username: null,
  status: 'authNone'
};

/*
* Роутер для аутентификации
*/

app.get('/', (req, res) => {
  // console.log(req.session);
  res.send('Hello World!');
});


app.post('/login', (req, res, next) => { 
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // currentUser.status = 'authNone';
      console.log('не удалось авторизовать');
      res.json('authNone');
      return;
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);       
      }  
      currentUser.username = req.query.username;
      currentUser.status = 'authYes';  
      // console.log('session.save -> статус авторизации ' + req.isAuthenticated());
      req.session.username = currentUser.username;    
      // console.log('пользователь' + req.session.username + 'залогинился');
      res.json(req.session.username);
        
    });
  })(req, res, next);
});




/*
* Роутер для проверки статуса аутентификации
*/
app.get('/loginstatus', (req, res, next) => {     
  if (req.session.username) {
    // console.log('ЛОГИНСТАТУС статус авторизации ' + req.session.username);  
    res.json(req.session.username); 
  } else {
    // console.log('ЛОГИНСТАТУС не авторизован !!!' + req.session.username);   
    res.json(false);    
  }  
   
});

const auth = (req, res, next) => {
  console.log('auth ' + req.isAuthenticated()); 
  if (req.isAuthenticated()) {
    next();
  } 
};

app.get('/admin', auth, (req, res) => {
  console.log('admin ' + req.isAuthenticated());
  res.json(req.isAuthenticated()); 
});


/*
* Роутер для логаута
*/
app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      console.log(err);
    }
    req.session = null;
    currentUser.username = null;
    res.json(0);  
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));