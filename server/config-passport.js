const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fetch = require('cross-fetch');
globalThis.usersData = '';                                          // Переменная, в которой будет храниться список логинов и паролей из БД

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

globalThis.userID = '';
passport.serializeUser(function(user, done) {  // console.log('Сериализация: ', user);
  console.log('Сериализация: ', user);
  done(null, user);
  userID = user;
});

passport.deserializeUser(function(id, done) {  // console.log('Десериализация: ', id);
  const user = userDB.id === id ? userDB : false;
  done(null, user);
});

passport.use(
  new LocalStrategy({ usernameField: 'username' }, function(
    username,
    password,
    done
  ) { 
//Проверяем введённые данные совпадения -->
    globalThis.agreement = '0';                                                                   // Флаг успешности проверки
    for (let i = 0; i <= usersData.length-1; i++) {      
          if (username === usersData[i]['login'] && password === usersData[i]['password']) {      // Если совпало - вернули i-пользователя
            agreement = 1;                                                                        // установили флаг, что всё Ок
            return done(null, usersData[i]);
          } else {
            continue;            
          }  
  }  
  if (agreement == 0) {return done(null, false);}                                                 // После цикла проверим, если флаг успеха не взведён - вернём false 
  })
);