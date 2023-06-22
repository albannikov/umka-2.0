<script>
/*
* Этот модуль организует всплывающее окно подтверждения 
*/
 export default {
    name: 'ComfirmModal',
    methods: {
      closeComfirm() {
        this.$emit('close');        
      },
    },    
  };
</script>

<script setup>
 import { useSnackbar } from "vue3-snackbar"; //Библиотека уведомлений, взял тут: https://craigrileyuk.github.io/vue3-snackbar/
 const snackbar = useSnackbar();

  async function delPoint() {
    let queryParams = "https://api.умныекарты.рф/del?id=" + click_id;            
    const response = await fetch(queryParams);      
    const data = await response.json();
    if (data.affectedRows == 1) {
      snackbar.add({
            "type": "success",
            "title": "Успешно",
            "text": "запись успешно удалена",
            "group": "5bfb7ed",
            "duration": 7000,
            "count": 1
          }) 
    }       
  }
</script>

<template>
  <transition name="comfirm-fade">
    <div class="comfirm-backdrop">
      <div class="comfirm"
        role="dialog"
        aria-labelledby="comfirmTitle"
        aria-describedby="comfirmDescription"
      >
        <header
          class="comfirm-header"
          id="comfirmTitle"
        >
          <slot name="header">
          </slot>
        </header>
        Вы действительно хотите удалить эту запись?
        <section
          class="comfirm-body"
          id="comfirmDescription"
        >
          <slot name="body">
            <div class="d-grid gap-2 col-6 mx-auto">   
            <button id="buttonFiltr"         
                      type="button"
                      class="btn btn-danger"
                      @click="delPoint(), closeComfirm()"
                    >Удалить
                      </button>      
            <button id="buttonFiltr"         
                      type="button"
                      class="btn btn-outline-primary"
                      @click="closeComfirm"
                    >Отменить
                      </button>
              </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<style>
  .comfirm-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .comfirm {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: 450px;
  }

  .comfirm-header,
  .comfirm-footer {
    padding: 15px;
    display: flex;
  }

  .comfirm-header {
    border-bottom: 1px solid #eeeeee;
    color: #0f5132;
    justify-content: space-between;
  }

  .comfirm-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .comfirm-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close-window {
    border: none;
    /* font-size: 20px; */
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #0f5132;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>