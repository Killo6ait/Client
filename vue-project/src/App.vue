
<template>
      <div class="container">
        <RouterView></RouterView>
    </div>
    <button @click="bob">dfgd </button>
</template>
<script>
import {authService} from './service/authService';

export default{
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

}
</script>
<style >
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

</style>
