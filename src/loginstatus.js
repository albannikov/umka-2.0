/* 
* Функция проверки авторизован ли пользователь
* выносим её в отдельный скрипт, чтобы вызвать его в самом начале index файла
*/
// const publicEnvVar = import.meta.env.VITE_API_URL;

async function getAuthStatus(){
  let response = await fetch('http://localhost/loginstatus', {  
credentials: "include"
}); // Получим статус авторизации пользователя
    let result = await response.json();
    if (result == false) {                                               // Если не авторизован, отправим его на страницу логина
        window.location.replace("http://localhost/#login");        
    } 
  };
getAuthStatus();

