<script setup>
//  import { fetchNewData } from '/Develop/heartmap-v2-4/yaheartmap'; 
 import { ref, reactive, onMounted } from 'vue';
 import Button from './Button.vue';
 import Modal  from './Modal.vue';
 import Comfirm  from './Comfirm.vue';
 import { useSnackbar } from "vue3-snackbar"; //Библиотека уведомлений, взял тут: https://craigrileyuk.github.io/vue3-snackbar/
 import router from '../router.js'

// console.log(import.meta.env.VITE_API_URL);
// async function getAuthStatus(){
//     let response = await fetch('https://auth.умныекарты.рф/loginstatus'); // Получим статус авторизации пользователя
//     let result = await response.json();
//     console.log('Результат выполнения authStatus = ' + result);
//     if (result == false) {                                               // Если не авторизован, отправим его на страницу логина
//         window.location.replace("https://умныекарты.рф/#login");        
//     } 
//   };
// getAuthStatus();

async function getAuthStatus(){
    let response = await fetch('https://auth.умныекарты.рф/loginstatus', {  
  credentials: "include"
}); // Получим статус авторизации пользователя
    let result = await response.json();
    // console.log('Результат выполнения loginstatus = ' + result);
    if (result == false) {                                               // Если не авторизован, отправим его на страницу логина
        window.location.replace("https://умныекарты.рф/#login");        
    } 
  };
getAuthStatus();







  // Props
  const props = defineProps({
    msg: String
  });

  const settings = {
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1',
  };  
  const count = ref(0);
  const name = ref("");
  const posts = ref([]);
  const loading = ref(false);
  const modalState = reactive({     // поп-ап окно добавления записи 
    loading: false,
    isVisible: false,
  });
    const ComfirmState = reactive({ // поп-ап окно подтверждения удаления
    loading: false,
    isVisible: false,
  });

  window.coordinates = [];
  /*
  * Функция получает список записей и передает координаты обработчику карты 
  */

async function getData() {   
  loading.value = true;
  const repsponse = await fetch('https://api.умныекарты.рф/');
  const data = await repsponse.json();
  posts.value = data;
  coordinates = [];
  // Наполним массив координатами точек, чтобы передать его в yaheartmap.js    
  for (let i = 0; i < data.length; 	i++) {    
    coordinates.push([data[i]['LOCATION_WIDTH'], data[i]['LOCATION_LONG']]);  
  }    
    setTimeout(() => {
      loading.value = false;
    }, 300);
}
/*
* Функция фиольтрации записей
* получаем с фронта параметры и делаем запрос
*/
window.DatePickerState = 0;
async function getQuery() {
  if (DatePickerState == 0) {           
      snackbar.add({
      "type": "error",
      "title": "Ошибка",
      "text": "Укажите диапазон дат",
      "group": "5bfb7ed",
      "duration": 70000,
      "count": 1
    })
    return;
  } 
  loading.value = true;
  let queryParams = "https://api.умныекарты.рф/query?tipe=" + tipeEvent + "&dateFrom=" + DateStart + "&dateTo=" + DateEnd;
  const response = await fetch(queryParams);      
  const data = await response.json();
  posts.value = data;
  coordinates = [];
  // Наполним массив координатами точек, чтобы передать его в yaheartmap.js   
  for (let i = 0; i < data.length; 	i++) {    
    coordinates.push([data[i]['LOCATION_WIDTH'], data[i]['LOCATION_LONG']]);  
  }  
    setTimeout(() => {
      loading.value = false;
    }, 50);      
}

/*
* Всплывающие модальные окна. По умолчанию не видимы
*/
const toggleModal = () =>  {
  modalState.isVisible = !modalState.isVisible;
  ComfirmState.isVisible = !ComfirmState.isVisible;
}

/*
* Всплывающие модальные окна. Меняем видимость при вызове ShowModal
*/
const showModal = () =>  {
  modalState.isVisible = true;
}

/*
* Всплывающие модальные окна. Меняем видимость при вызове ShowModal 
*/
async function closeModal() {
  await getData();          // обновляем список записей после закрытия окна
  modalState.isVisible = false;  
}

/*
* Всплывающие модальные окна. Меняем видимость при вызове ShowModal 
*/
async function closeComfirm() {
  await getData();        // обновляем список записей после закрытия окна
  ComfirmState.isVisible = false;     
}

/*
* При нажатии на кнопку корзины получаем ID нажатой кнопки = ID удаляемого элемента
*/
window.click_id = '';
const showComfirm = (clicked_id) =>  {
  ComfirmState.isVisible = true;
  click_id = clicked_id;
}


/*
* При нажатии приложения выполяем getData и получаем последние 20 записей из базы
*/


onMounted(async () => {
  await getData();  
});

const snackbar = useSnackbar(); // Подключаем всплывающие сообщения
</script>

<script type="text/javascript">
export default {
    methods: {    
/*
* Метод для форматирования даты, которую получаю из базы и вывожу в таблицу,
* взял от сюда https://jerickson.net/how-to-format-dates-in-vue-3/
*/
        formatDate(dateString) {      
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
        }
    }
}

/*
* для ДатаПикера используем библиотеку daterangepicker.com
*/

$(function() { 
// [moment(), moment()]
  $('input[name="datefilter"]').daterangepicker({
       "showDropdowns": true,
          ranges: {
        'Сегодня': [moment(), moment()],
        'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '7 дней': [moment().subtract(6, 'days'), moment()],
        '30 дней': [moment().subtract(29, 'days'), moment()],
        'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
        'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
         "alwaysShowCalendars": true,
      autoUpdateInput: false,
      locale: {
        "format": "DD.MM.YYYY",
        "separator": " - ",
        "applyLabel": "Выбрать",
        "cancelLabel": "Отмена",
        "fromLabel": "от",
        "toLabel": "до",
        "customRangeLabel": "Вручную",
        "weekLabel": "н",
        "daysOfWeek": [
            "ВС",
            "ПН",
            "ВТ",
            "СР",
            "ЧТ",
            "ПТ",
            "СБ"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
           "firstDay": 1
      }
  });

  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY'));
      window.DateStart = picker.startDate.format('YYYY-MM-DD');
      window.DateEnd = picker.endDate.format('YYYY-MM-DD');
      DatePickerState = 1; // Ставим флаг, что значение получено
  });

  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });

});
// -END- Получаем значение из Datepicker

// -BEGIN- Получаем значение из Select
  window.tipeEvent = "all"; //По умолчанию (до выбора) пусть выбирается всё
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("tipes").onchange = function() {
      tipeEvent = document.getElementById("tipes").value;
    };
  });
// -END- Получаем значение из Select

/* 
* Функция разлогинивания
*/



async function AuthExit(){
  let response = await fetch('https://auth.умныекарты.рф/logout', {  
  credentials: "include"
});
  let result = await response.json();
if (result == 0) {    
  router.push('login');
} 
}
</script>

<template>
    <header class="d-flex flex-wrap justify-content-center py-3 border-bottom header">      
        <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <div class="logo"></div>     
        </a>      
        <ul class="nav nav-pills">
          <li class="nav-item" @click="AuthExit"><button class="btn btn-outline-primary">Выход</button></li>         
        </ul>
    </header>   
    <div class="row main-block">
      <div class="col-2 left-menu">
      
        <div id="app">  
          <Modal
            v-show="modalState.isVisible"
            @close="closeModal"
          />

            <Comfirm
            v-show="ComfirmState.isVisible"
            @close="closeComfirm"
          />
        </div>
        <div class="container">
          <div class="row">  
            <div class="hint">Период</div>
            <input type="text" name="datefilter" class="datefilter" value="" />
              <div class="hint">Категория</div>
              <select name="tipes" id="tipes" class="tipes">
                          <option value="all">Все</option>
                          <option value="Snow">Снег</option>
                          <option value="ice">Гололед</option>  
                          <option value="Trash">Мусор</option>     
                          <option value="Heart">Отопление</option>
                          <option value="light">Уличное освещение</option>             
                         
              </select>
              <Button id="buttonFiltrQuery"
                  @click="getQuery" 
                  :variant="'success'" 
                  :disabled="loading"
                  >
                  Фильтр
                  </Button>

                    <Button      
                    @click="showModal"
                    :variant="'warning'"
                  >
                  <i class="fa fa-plus" aria-hidden="true"></i> 
                  Добавить
                  </button>                  
            </div>
          </div>

      </div>
      <div class="col-10 hero-unit ">   
        <div class="container">     
          <div id="YMapsID"></div>  
          <div v-if="loading"> 
            <div class="spinner-border text-primary" role="status">      
              <span class="sr-only"></span>
            </div>
          </div>
      <div v-else>
          <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Дата</th>
                    <th>Номер</th>
                    <th width="50%">Описание</th>
                    <th> </th>
                  </tr>
                </thead>            
        <tbody>
          <tr v-for="post in posts" :key="post.id">          
            <td v-bind:class="post.TIPE"><img v-bind:src="'/src/img/' + post.TIPE + '.png'" width="20"></td>   <!-- Соответствующая иконка  -->
            <td>{{ formatDate(post.DATE) }}</td>   
            <td>{{ post.INCIDENT }}</td>      
            <td>{{ post.DESCRIPTION }}</td>
            <td width="20" > <button title="Удалить" type="button" :id="post.id" @click="showComfirm(post.id)" class="btn btn-outline-secondary btn-sm"><i class="fa fa-trash" aria-hidden="true">    </i></button></td>  
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>

<!-- Footer -->
<footer class="text-center text-lg-start bg-light text-muted">
  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
  <section class="">
    <div class="container text-center text-md-start mt-5">
      <div class="row mt-3">
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">          
        </div>     
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">             
         <img src = "/src/img/logo-footer.png" width="180px" >
        </div>       
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"></div>
      </div>     
    </div>
  </section>
</footer>
<!-- Footer -->
</template>

<style>
.error {
  overflow: hidden;
  max-height: 100vh;
}
@media (max-width: 1400px) { 
  .lamp {
    zoom: .5;
  }
  .error__content {
    top: 55%;
  }
  .message__title {
    font-size: 3.5rem;
  }
}
@media (max-width: 900px) {

  .message__title {
    font-size: 34px;

  }
  .error__content {
    top: 55%;
  }
  }
@media (max-width: 950px) {
  .lamp__wrap {
    max-height: 100vh;
    overflow: hidden;
    max-width: 100vw;
  }
  .error__social {
    bottom: 30px;
    top: auto;
    transform: none;
    width: 100%;
    position: fixed;
    left: 0;
  }
  .e-social__icon {
    display: inline-block;
    padding-right: 30px;
  }
  .e-social__icon:last-child {
    padding-right: 0;
  }
  .e-social__icon {
    padding-bottom: 0;
  }
}
@media (max-width: 750px) {
  body, html {
    max-height: 100vh;
  }
   .error__content {
    position: static;
    margin: 0 auto;
    transform: none;
    padding-top: 300px;
  }
  .error {
    padding-top: 0;
    padding-bottom: 100px;
    height: 100vh;
  }
  }
@media (max-width: 650px) {
  .message__title {
    font-size: 36px;
    padding-bottom: 20px;
  }
  .message__text {
    font-size: 16px;
    line-height: 2;
    padding-right: 20px;
    padding-left: 20px;
  }
  .lamp {
    zoom: .6;
  }
  .error__content {
    padding-top: 180px;
  }
  }
@media (max-width: 480px) {

  .message__title {
    font-size: 30px;
  }
  .message__text {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
  }
  .error__nav {
    margin-top: 20px;
  }
}
</style>