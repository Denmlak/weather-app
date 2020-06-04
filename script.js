
const key='73b38f1787b61f6c2e3958f7089eee39';
const temp=document.querySelector('.temp');
const weather=document.querySelector('.weather');
const currentLocation= document.querySelector('.city');
const icon= document.querySelector('.icon');
const search= document.querySelector('.search');
const wind= document.querySelector('.wind');
const notification= document.querySelector('.notification');


const results= (api)=>{
	fetch(api)
		.then(response=>{
			return response.json();
		})
		.then(data=>{
			if (data.weather === undefined) {
				notification.style.visibility='visible';
				notification.innerText="No such city has been found, please try again";
			}
			else{
				notification.style.visibility='hidden';
				const currentWeather=data.weather[0].description;
				const temperature=Math.floor(data.main.temp -273.15);
				const windSpeed=data.wind.speed;
				temp.innerHTML=`${temperature} <span>°C</span>`;
				weather.innerText= currentWeather;
				currentLocation.innerText=`${data.name} , ${data.sys.country}`;
				icon.innerHTML= `<img src="icon/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
				wind.innerHTML=` Wind : ${windSpeed} <span>m/s</span>`
			}	
		})
}

const getCurrentLocation=()=>{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position=>{
			let long=position.coords.longitude;
			let lang=position.coords.latitude;
			const api= `https://api.openweathermap.org/data/2.5/weather?lat=${lang}&lon=${long}&appid=${key}`;

			results(api);		
		}, error=>{
			notification.style.visibility='visible';
			notification.innerText=error.message;
		})
	}
	else{
		notification.style.visibility='visible';
		notification.innerText="Browser doesen't support Geolocation";
	}
}

window.addEventListener('load', getCurrentLocation);


const getQuery=(e)=>{
	if (e.keyCode == 13) {
		const city= search.value;
		const api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

		results(api);
	}
}

search.addEventListener('keypress', getQuery);