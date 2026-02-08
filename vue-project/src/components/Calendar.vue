<template>
    <body>
        <div class="container">
             <div class="header">
                <button class="head-item month" @click="setView('month')">Месяц</button>
                <button class="head-item week" @click="setView('week')">Неделя</button>
                <button class="head-item year" @click="setView('year')">Год</button>
             </div>
             <div class="nav">
                <div class="navigation">
                    <button class="nav-item ellips next" @click="changeDate(-1)">⬅</button>
                    <div class="nav-item">{{ formatDate}}</div>
                    <button class="nav-item ellips prev" @click="changeDate(+1)">➡</button>
                </div>
             </div>
             <div class="calendar-container">
                 <div class="view-month"  v-if="view === 'month'">
                    <div class="week-days">
                        <div class="week-day" v-for="day in weekShort" :key="day">{{ day }}</div>
                    </div>
                    <div class="month-days">
                        <div class="month-day"  v-for="day in loadingMonthDay" :class="{'isToday': day.isToday, 'isCurrentMonth': !day.isCurrentMonth }">{{ day.day}}</div>
                    </div>
                 </div>
                 <div class="view-week" v-if="view === 'week'">
                     <div class="week-days">
                        <div class="week-day" v-for="day in weekShort" :key="day">{{ day }}</div>
                    </div>
                    <div class="days-in-week">
                        <div class="day-in-week" v-for="day in loadingWeekDay" :key="day" :class="{'isToday': day.isToday}">{{ day.day }}</div>
                    </div>
                 </div>
                 <div class="view-year"  v-if="view === 'year'">
                    <div class="year-month">
                        <div class="year-month-days" v-for="month in loadingYearMonthDay" :key="month.index">
                            <h3>{{ month.name }}</h3>
                            <div class="year-days">
                                <div class="year-day" v-for="day in month.days" :key="day" :class="{'isToday': day.isToday}">{{ day.day}}</div>
                            </div>
                        </div>

                    </div>
                 </div>

             </div>
        </div>
        <button @click="loadingMonthDay">Проверка</button>
    </body>
</template> 
<script>
import { computed } from 'vue';

export default{
    data(){
        return{
            month: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
            weekShort: ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
            weekFull: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
            view: 'month',
            currentDate: new Date()
        }
    },
    methods:{
        setView(view){
            this.view = view
        },
        changeDate(par){
            const newDate = new Date(this.currentDate)
            if(this.view == 'month'){
                newDate.setMonth(newDate.getMonth() + par)
            } else if(this.view == 'week'){
                newDate.setDate(newDate.getDate() + par*7)
            } else {
                newDate.setFullYear(newDate.getFullYear() + par)
            }
            this.currentDate = newDate
        },
         getWeekStart(){
            const date = new Date(this.currentDate)
            const day = date.getDay()
            const roznica = date.getDate() - day + (day === 0 ? -6: 1)
            const weekStart = new Date(date)
            weekStart.setDate(roznica)
            return weekStart
        }
        
    },
    computed:{
            formatDate(){
                const options ={   }
                if(this.view === 'month'){
                    options.year = 'numeric'
                    options.month = 'long'
                } 
                else if(this.view === 'week'){
                    const weekStart = this.getWeekStart()
                    const weekEnd = new Date(weekStart)
                    weekEnd.setDate(weekEnd.getDate() + 6)
                    console.log(weekStart)
                    console.log(weekEnd)
                    // const startStr = ''
                     const startStr = weekStart.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short' 
                    })

                    const endStr = weekEnd.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })
                    return `${startStr} - ${endStr}`
                } 
                else if(this.view === 'year'){
                    return this.currentDate.getFullYear() + 'г'
                }
                return this.currentDate.toLocaleDateString('ru-Ru', options)
            },
            loadingMonthDay(){
            const res = []
            const date = new Date(this.currentDate)
            const year = date.getFullYear()
            const month = date.getMonth()
            const firstMonthDay = new Date(year, month, 1)
            const lastMonthDay = new Date(year, month+1, 0)
            const dayInMonth = lastMonthDay.getDate()
            let firstDayWeekInMonth = firstMonthDay.getDay()
            const daysInPrevMonth = new Date(year,month,0).getDate()

            // console.log(firstDayWeekInMonth)
            if (firstDayWeekInMonth === 0) {
                firstDayWeekInMonth = 6; 
            } else {
                firstDayWeekInMonth -= 1; 
            }

            for(let i=0; i<firstDayWeekInMonth; i++){
                const dayNumber = daysInPrevMonth -firstDayWeekInMonth + i + 1
                res.push({
                    day: dayNumber,
                    isCurrentMonth: false,
                    isToday: false
                })
            }

            const toDay = new Date()
            for(let i=1; i<=dayInMonth; i++){
                // console.log(date)
                const date = new Date(year, month, i)
                const isToday = date.toDateString() === toDay.toDateString()
                res.push({
                    day: i,
                    isCurrentMonth: true,
                    isToday: isToday
                })
            }
            const maxDayInGrid = 42
            const ostatok = maxDayInGrid - res.length
            for(let i=1; i<= ostatok; i++){
                res.push({
                    day: i,
                    isCurrentMonth: false,
                    isToday: false
                })
            }
            return res
        },
        loadingWeekDay(){
            const weekStart = this.getWeekStart()
            const res = []
            const toDay = new Date()
            for(let i=0;i<7;i++){
                const date = new Date(weekStart)
                date.setDate(date.getDate()+ i)
                const day = date.getDate()
                const isToday = toDay.toDateString() === date.toDateString()
                res.push({
                    day: day,
                    isToday: isToday
                })
            }
            return res
        },
        loadingYearMonthDay(){
            const res = []
            const year = this.currentDate.getFullYear()
            const toDay = new Date()

            for(let monthi=0; monthi<12;monthi++){
                const month = []
                let firstday = new Date(year, monthi, 1)
                const firstWeekDay = firstday.getDay()
                
                if(firstday === 0){
                    firstday = 6
                }else{
                    firstday -= 1
                }
                for(let i=0; i<firstWeekDay; i++){
                    month.push({
                        day: '',
                        isToday: false
                    })
                }

                const dayInMonth = new Date(year, monthi+1, 0).getDate()
                for(let i =1; i<=dayInMonth; i++){
                    const isToday = toDay.getFullYear() === year && toDay.getMonth() === monthi && toDay.getDate() === i
                    month.push({
                        day: i,
                        isToday: isToday
                    })
                }
                res.push({
                    index: monthi,
                    name: this.month[monthi],
                    days: month
                })
            }
            return res
        }
       
    } 
}
</script>
<style scoped>
body{
     background: linear-gradient(to left, rgb(87, 15, 146), rgb(55, 6, 95));
     min-height: 100vh;
        display: flex;
        align-items: center;
     font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.container{
    width: auto;
    /* min-width: 600px;
    max-width: 850px; */
    color: white;
    margin: 0 auto;
    
}
.header{
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
    
}
.head-item{
    padding: 15px ;
    border: 1px solid white;
    border-radius: 12px;
    box-shadow: 2px 2px 2px 2px ;
    background: none;
    font-size: 24px;
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.head-item:hover{
    transition: ease 0.3s;
    box-shadow: 2px 4px 2px 4px rgb(195, 221, 221);
    cursor: pointer;
    
}
.navigation{
    display: flex;
    justify-content: center;
}
.nav-item.ellips{
    background: white;
    border-radius: 50%;
    color: black;
    cursor: pointer;
}
.nav-item.ellips:hover{
    transition: ease 0.2s;
    background-color: azure;
}
.nav-item{
    border-radius: 12px;
    background: none;
    color: black;
    padding: 15px;
    border: none;
    font-size: 20px;
    color: white;
}
.calendar-container{
    display: flex;
    justify-content: center;
    margin-top: 60px;
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
}
.week-days{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}
.week-day{
    background: rgb(187, 197, 204);
    padding: 20px;
    border-radius: 12px;
    color: black;
    text-align: center;
    }
.month-days{
    display: grid;
    grid-template-columns: repeat(7,1fr); 
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    color: black;
    text-align: center;
}
.isToday{
    color: rgb(107, 6, 6);
    /* border-radius: 50%; */
    background: rgb(101, 157, 241);
}

.month-day{
    border-radius: 12px;
    padding: 20px 0;
}
.month-day:hover{
    background: rgb(173, 207, 238);
    
}
.isCurrentMonth{
    color: grey;
}
.days-in-week{
    color: black;
    display: grid;
    grid-template-columns: repeat(7,1fr);
    text-align: center;
    grid-column-gap: 10px;
}
.day-in-week{
    padding: 15px 0;
    border-radius: 12px;
}

.day-in-week:hover{
    transition: ease 0.2s;
    background: rgb(173, 207, 238);
}
.year-month{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-row-gap: 20px;
    grid-column-gap: 40px;
    text-align: center;
}
.year-days{
    display: grid;
    grid-template-columns: repeat(7,1fr);
    font-family: 'Times New Roman', Times, serif;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    margin-top: 20px;
}
.year-day{
    border-radius: 2px;
}
</style>