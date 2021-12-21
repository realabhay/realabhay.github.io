fetch("https://valorant-api.com/v1/agents")
      .then(weather => {
        return weather.json();
      }).then(displayResults);


  function displayResults (weather) {
    console.log("hey");
    console.log(weather);
    console.log(weather.data[9].fullPortrait);
  }