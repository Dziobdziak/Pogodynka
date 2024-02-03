const togglerBtn = document.querySelector('.togglerButton')
const navLeftBar = document.querySelector('.navLeftBar')
const actualDay = document.querySelector('.actualDay')
const actualMonth = document.querySelector('.actualMonth')
const actualYear = document.querySelector('.actualYear')
const monthAndYear = document.querySelector('.monthAndYear') //miesiąc i rok w nagłówku
const dayFirstDate = document.querySelector('.dayFirstDate')
const search = document.querySelector('.search')
const goBtn = document.querySelector('.goBtn')
const cityName = document.querySelector('.cityName')
const actualTemp = document.querySelector('.actualTemp')
const minTemp = document.querySelector('.minTemp')
const maxTemp = document.querySelector('.maxTemp')
const feelsTemp = document.querySelector('.feelsTemp')
const cloudsPercent = document.querySelector('.cloudsPercent')
const sunriseTime = document.querySelector('.sunriseTime')
const sunsetTime = document.querySelector('.sunsetTime')
const actualWeatherStatus = document.querySelector('.actualWeatherStatus')
const actualWindSpeed = document.querySelector('.actualWindSpeed')
const actualPressure = document.querySelector('.actualPressure')
const actualHumidity = document.querySelector('.actualHumidity')
const actualTemperature = document.querySelector('.actualTemperature')
const actualIconImageFirst = document.querySelector('.actualIconImageFirst')
const actualIconImageSecond = document.querySelector('.actualIconImageSecond')
const actualIconImageThird = document.querySelector('.actualIconImageThird')
const actualIcon = document.querySelector('.actualIcon')
const actualHour = document.querySelector('.actualHour')
const paraRandomFact = document.querySelector('.paraRandomFact')
const rightMainDiv = document.querySelector('.rightMainDiv')
const listElements = document.querySelectorAll('li')
const spanDayOfWeek = document.querySelector('.spanDayOfWeek')

//Link do API pogodowego
const API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=`

//Klucz do API pogodowego
const API_KEY = '&APPID=ebb6b0b21a9c59c8ec51f6ac599f5226'

window.addEventListener('DOMContentLoaded', () =>{
    getWeather()
    setInterval(getActualTime, 10)
    getRealDate()
    getFact()

    //Akceptowanie wyszukiwania za pomocą entera
    document.addEventListener('keypress', (e) =>{
        let keyCode = e.keyCode ? e.keyCode : e.which;
        if(keyCode === 13) {
          getWeather()
}})
    goBtn.addEventListener('click', getWeather)
})

//Funkcja podstawiająca pogodę
const getWeather = () => {
    const city = search.value || 'Warszawa'

    const API_URL = `${API_LINK}${city}${API_KEY}&units=metric&lang=pl`
    
        axios.get(API_URL).then(res =>{
        cityName.textContent = search.value || 'Warszawa'
        const icoCode = res.data.weather[0].icon
        const actualTempFromAPI = (Number(res.data.main.temp) < 0) && (Number(res.data.main.temp) > -1) ? "0°C" : Number(res.data.main.temp).toFixed(0) + "°C"
        actualTemp.textContent = actualTempFromAPI
        actualWeatherStatus.textContent = res.data.weather[0].description
        minTemp.textContent = (Number(res.data.main.temp_min) < 0) && (Number(res.data.main.temp_min) > -1) ? "0°C" : Number(res.data.main.temp_min).toFixed(0) + "°C"
        maxTemp.textContent = (Number(res.data.main.temp_max) < 0) && (Number(res.data.main.temp_max) > -1) ? "0°C" : Number(res.data.main.temp_max).toFixed(0) + "°C"
        cloudsPercent.textContent = Number(res.data.clouds.all) + '%'
        feelsTemp.textContent = (Number(res.data.main.feels_like) < 0) && (Number(res.data.main.feels_like) > -1) ? "0°C" : Number(res.data.main.feels_like).toFixed(0) + "°C"

        const sr = new Date(res.data.sys.sunrise * 1000).toLocaleTimeString() //wschód słońca
        const ss = new Date(res.data.sys.sunset * 1000).toLocaleTimeString() //zachód słońca
        sunriseTime.textContent = sr
        sunsetTime.textContent = ss
        actualHumidity.textContent = res.data.main.humidity + '%'
        actualTemperature.textContent = actualTempFromAPI

        actualWindSpeed.textContent = (Number(res.data.wind.speed) * 3.6).toFixed(0) + ' km/h'
        actualPressure.textContent = (Number(res.data.main.pressure)) + ' hPa'

        actualIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icoCode}@2x.png`)
        search.value = ''
    })
}

//Funkcja obsługująca API z ciekawostkami
const getFact = () => {
    const FUN_API_URL = 'https://uselessfacts.jsph.pl/today.json?language=en'

    axios.get(FUN_API_URL).then(res => {
        paraRandomFact.textContent = res.data.text
    })
}


//Podstawianie dni, miesięcy, daty
const getRealDate = () => {
    const dateNow = new Date()
    const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
    const dayNames = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']
    const dayOfWeek = dateNow.toLocaleString('default', {weekday: 'long'}) 
    const dayNow = dateNow.getDate() //dzień miesiąca
    const month = dateNow.getMonth() //miesiąc
    const year = dateNow.getFullYear() //rok

    actualDay.textContent = dayNow
    actualMonth.textContent = month + 1
    actualYear.textContent = year

    monthAndYear.textContent = `${monthNames[month]} ${year}`
    spanDayOfWeek.textContent = `${dayOfWeek} `
}


//Zegarek na stronie
const getActualTime = () =>{
    const dateNow = new Date()
    const hour = ((dateNow.getHours() < 10) ? "0" + dateNow.getHours() : dateNow.getHours())
    const minutes = ((dateNow.getMinutes() < 10) ? "0" + dateNow.getMinutes() : "" + dateNow.getMinutes())
    actualHour.textContent = `${hour}:${minutes}`

    hour > 17  ? rightMainDiv.style.background = 'linear-gradient(170deg, rgb(50, 107, 205) 0%, rgba(0,0,0,1) 100%)' : rightMainDiv.style.backgdround = 'linear-gradient(170deg, rgb(239, 185, 37) 0%, rgba(0,0,0,1) 100%);'
}


//Info do menu :D
listElements.forEach(el => {
    el.addEventListener('click', () =>{
        alert('Tu kiedyś coś będzie :D')
    })
})


//Obsługa BurgerMenu
togglerBtn.addEventListener('click', () => {
    navLeftBar.classList.toggle('active')
})
