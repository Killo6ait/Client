<template>
    <div class="container">
        <div class="auth-form">
            <div class="header"><h1>Авторизация</h1></div>
            <form id="auth" @submit.prevent="auth">
                <div class="main-form">
                    <div class="form-group"> 
                        <label for="email">Емаил:</label>
                        <input v-model="formData.email" type="text" placeholder="Введите email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Телефон:</label>
                        <input v-model="formData.phone" type="text" placeholder="Введите телефон" id="phone" required> 
                    </div>
                    <button class="btn">Авторизоваться</button>
                    <div class="message" :class="{'suc': succesMessage, 'err': errorMessage}" v-if="succesMessage || errorMes">{{succesMessage}}{{ errorMessage }}</div>
                </div>
            </form>
            <div class="next-reg"><router-link to="/reg" id="reg-a">Зарегистрироваться?</router-link></div>
        </div>
    </div>

</template>
<script >
    export default{
        data(){
            return{
                formData:{
                    email: '',
                    phone: ''
                },
                succesMessage: '',
                errorMessage: ''
            }
        },
        methods:{
            async auth(){
                const data = await fetch(`http://localhost:5000/home/auth`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.formData.email,
                        phone: this.formData.phone
                    })
                })
                const response = await data.json()
                // console.log(response)
                if (data.ok){
                    this.succesMes('Вы успешно авторизованы')
                    localStorage.setItem('token', response.token)
                    setTimeout(()=>{

                        this.$router.push('/home')
                    },4000)
                    

                }
                else this.errorMes('Не удалось авторизоваться')
            },
            succesMes(par){
                this.succesMessage = par

                setTimeout(()=>{
                    this.succesMessage = ''
                },3000)
            },
            errorMes(par){
                this.errorMessage = par

                setTimeout(()=>{
                    this.errorMessage = ''
                },3000)
            },
            toma(){
                console.log(localStorage.getItem('token'))
            }
           
        }
    }
</script>
<style scoped>
      .container{
        height: 100vh;
        background: linear-gradient(rgb(29, 86, 139),rgb(34, 55, 114));
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .auth-form{
        min-width: 350px;
        max-width: 400px;
        width: 100%;
        color: #fff

    }
    h1{
        text-align: center;
        margin-bottom: 30px;
        /* color: rgb(168, 204, 235); */
    }
    form{
        padding: 30px;
        border: 2px solid rgb(6, 51, 90);
        border-radius: 25px;
    }
    .main-form{
        display: flex;
        flex-direction: column;
    }
    input{
        border: none;
        border-radius: 6px;
        padding: 10px 5px;
        background: none;
        font-size: 16px;
        color: rgb(168, 204, 235);
        width: 100%;
    }
    label{
        margin-right: 15px;
        font-size: 24px;
        /* color: rgb(168, 204, 235); */
    }
    .form-group{
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn{
        padding: 15px 5px;
        border: none;
        color: #fff;
        box-shadow: 2px 1px 2px 1px white;
        border-radius: 18px;
         font-weight: bold;
        background: linear-gradient(45deg, rgb(31, 62, 102),rgb(18, 12, 94));
    }
    .btn:hover{
        cursor: pointer;
    }
    #reg-a{
        color: rgb(179, 211, 253);
        text-decoration: none;
        
    }
    .next-reg{
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
    }
    .message{
        margin-top: 20px;
        opacity: 0.7;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bold;
    }
    .suc{
        color: rgb(17, 201, 17);
    }
    .err{
        color: rgb(184, 20, 20);
    }
</style>