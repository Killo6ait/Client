<template>
    <div class="container">
        <div class="reg-form">
            <div class="header"><h1>Регистрация</h1></div>
            <form id="reg" @submit.prevent="reg">
                <div class="main-form">
                     <div class="form-group">
                        <label for="full-name">Полное имя:</label>
                        <input v-model="formData.fullName" type="text" placeholder="Введите ФИО" id="full-name" required> 
                    </div>
                    <div class="form-group"> 
                        <label for="email">Емаил:</label>
                        <input v-model="formData.email" type="text" placeholder="Введите email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Телефон:</label>
                        <input v-model="formData.phone" type="text" placeholder="Введите телефон" id="phone" required> 
                    </div>
                    <div class="form-group">
                        <label for="address">Адрес:</label>
                        <input v-model="formData.address" type="text" placeholder="Введите адрес" id="address" required> 
                    </div>
                    <button class="btn">Зарегистрироваться</button>
                    <div class="message" :class="{'suc': succesMessage, 'err': errorMessage}" v-if="succesMessage || errorMes">{{succesMessage}}{{ errorMessage }}</div>
                </div>
            </form>
            <div class="next-auth"><router-link to="/auth" id="auth-a">Авторизоваться?</router-link></div>
        </div>

    </div>

</template>
<script >
    export default{
        data(){
            return{
                formData:{
                    email: '',
                    phone: '',
                    fullName: '',
                    address: ''
                },
                succesMessage: '',
                errorMessage: ''
            }
        },
        methods:{
            async reg(){
                const data = await fetch(`http://localhost:5000/home/reg`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.formData.email,
                        phone: this.formData.phone,
                        fullname: this.formData.fullName,
                        address: this.formData.address
                    })
                })
                if (data.ok){
                    this.succesMes('Регистрация успешна!')
                    this.clearFormData()
                    setTimeout(()=>{
                        this.$router.push('/auth')
                    },4000)
                    
                }
                else this.errorMes('Вы не зарегистрированы!')
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
            clearFormData(){
                this.formData.address = ''
                this.formData.email = ''
                this.formData.fullName = ''
                this.formData.phone = ''
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
    .reg-form{
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
    #auth-a{
        color: rgb(179, 211, 253);
        text-decoration: none;
        
    }
    .next-auth{
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