let ww = fetch("https://valorant-api.com/v1/agents")
  .then(weather => { return weather.json(); })
  .then(weather => displayAgents(weather));

function displayAgents(weather) {
  weather.data.forEach(element => {
    let img = document.createElement("img");
    img.src = element.displayIcon;
    img.className = "agentImg";
    console.log(arrIndex);

    let div = document.createElement("div");
    div.className = "agentFrame";
    let br = document.createElement("br");
    div.textContent = element.displayName;
    div.append(img);
    let agentSelect = document.querySelector("div.agentShowcase");
    agentSelect.append(div);

    let arrIndex = weather.data.indexOf(element);
    div.addEventListener('click',() =>{
      openAgent(arrIndex);
    });
  });
}

function openAgent(index) {
  console.log(index);
}


//  find out the length of the array then create a frame for each agent with picture, name and link