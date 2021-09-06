let weather = {
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +city+"&units=metric&appid=0f7cc05d144a21118d4c162fb0fff320")
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp ,temp_min,temp_max} = data.main;
    const { speed } = data.wind;
    const { timezone } = data;
    var d = new Date(new Date().getTime() + (timezone * 1000));
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var d1 = d.toLocaleString('en-US', options).split(",");
    var date = d1[1];
    var week = d1[0];
    var year = d1[2];
    document.querySelector(".city").innerText =  name.toUpperCase() +", " + country;
    document.querySelector(".timezone").innerText =  date +" ( " + week + " ), " + year;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = parseInt(temp) + "°C";
    document.querySelector(".temp_min").innerText = "Min temp: "+temp_min + "°C";
    document.querySelector(".temp_max").innerText ="Max temp: "+ temp_max + "°C";
    document.querySelector(".wind").innerText ="Wind speed: "+speed + " km";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + description + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Chandigarh");
