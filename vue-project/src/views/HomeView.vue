<script>
import Calendar from '@/components/Calendar.vue';
import {authService} from '../service/authService';
import LoadingTa from '@/components/LoadingTa.vue';

export default{
  components:{
    Calendar,
    LoadingTa
  },
  methods:{
    tom(){
      authService.removeToken()
      console.log(authService.getToken())
    },
    async bob(){
      const token = authService.getToken()
      const res = await fetch("http://localhost:5000/home/products",{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await res.json()
      console.log(JSON.stringify(data))
    }

  },
  mounted(){
    
  }
}
</script>

<template>
  <div class="container">
    <div class="left-menu">
      <Button @click="tom">Выход</Button>
    <Button @click="bob">Проверка</Button>
  </div>
    <div class="content"><Calendar/></div>
    
  </div>
</template>
<style scoped>
  .container{
    height: 100vh;
    background-color: rgb(100, 100, 87);
    display: flex;
  }
  .left-menu{
    width: 100%;
    background: rgb(75, 61, 107);
    min-width: 150px;
    max-width: 300px;
  }
  .content{
    width: 100%;
  }
</style>
