let cityName = document.querySelector(".city_name");
let dateTime = document.querySelector(".date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".temp");
let w_minTemp = document.querySelector(".min_temp");
let w_maxTemp = document.querySelector(".max_temp");

let w_feelsLike = document.querySelector(".weather_feels");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_app__search__input");


let city="narowal"

const getUserInput =()=>{
  event.preventDefault()
  city=citySearch.value
  getWeatherData()
  citySearch.value=""
}
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getWeatherData = async () => {
  const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=abb178116b83d088d6bc2793e6354f1d`
  
  try{
    const res= await fetch(apiUrl)
    const data= await res.json();
    console.log(data);
    
    const {name,sys,dt,timezone,weather,main,wind}=data
    if(!name){
      return showToast("City Not Found")
    }
    
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`
    dateTime.innerHTML=dayjs((dt)*1000).format("dddd MMMM DD,YYYY [At] hh[.]mm A")
    w_forecast.innerHTML=weather[0].main
    w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`
    w_temp.innerHTML=(main.temp-273).toFixed(2)+"&deg;C";
    w_minTemp.innerHTML=`Min: ${(main.temp_min-273).toFixed()} &deg;C `
    w_maxTemp.innerHTML=`Max: ${Math.ceil((main.temp_max-273))} &deg;C `
    w_feelsLike.innerHTML=`${Math.floor(main.feels_like-273)} &deg;`
    w_humidity.innerHTML=`${main.humidity} %`
    w_wind.innerHTML=`${wind.speed} m/s`
    w_pressure.innerHTML=`${main.pressure} hPa`
  } catch(error){
    showToast("Oops! Something went wrong. Please try again later.");  }
  
  
}

document.body.addEventListener("load", getWeatherData());

const showToast = (msg) => {
  Toastify({
  text: msg,
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  // close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "#F00000",
    borderRadius: "10px"
  },
  onClick: function () {}, // Callback after click
  }).showToast();
};