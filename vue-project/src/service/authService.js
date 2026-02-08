export  const authService = {
    getToken(){
        return localStorage.getItem('token')
    },
    setToken(token){
        localStorage.setItem('token', token)
    },
    removeToken(){
        localStorage.removeItem('token')
    },
    isTokenExp(){
        const token = this.getToken()
        if(!token) return true;

        try{
            const payload = JSON.parse(atob(token.split('.')[1]))
            const expiry = payload.exp * 1000
            return Date.now() >= expiry

        }
        catch(e){
            console.log("Ошибка декодирования токена")
            return true
        }
    },
    isValidToken(){
        const token = this.getToken()
        return token && !this.isTokenExp()
    }
}
