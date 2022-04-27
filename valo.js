let ww = fetch("https://valorant-api.com/v1/agents")
  .then(weather => { return weather.json(); })
  .then(weather => displayAgents(weather));

function displayAgents(weather) {
  weather.data.forEach(element => {
    let img = document.createElement("img");
    img.src = element.displayIcon;
    img.className = "agentImg";

    let div = document.createElement("div");
    div.className = "agentFrame";
    let br = document.createElement("br");
    div.textContent = element.displayName;
    div.append(img);
    let agentSelect = document.querySelector("div.agentShowcase");
    agentSelect.append(div);

    let arrIndex = weather.data.indexOf(element);
    div.addEventListener('click',() =>{
      openAgent(arrIndex, weather);
    });
  });
}

function openAgent(index, weather) {
  console.log(index);
  displayName = weather.data[index].displayName;
  description = weather.data[index].description;
  displayIcon = weather.data[index].displayIcon;
  bustPortrait = weather.data[index].bustPortrait;
  fullPortrait = weather.data[index].fullPortrait;
  killfeedPortrait = weather.data[index].killfeedPortrait;
  role = weather.data[index].role.displayName;
  
  //debugger;
  document.querySelector("span.role").textContent = role;
  document.querySelector("span.name").textContent = displayName;
  document.querySelector("img.attributes.one").src = weather.data[index].role.displayIcon;
  document.querySelector("img.attributes.one").src = weather.data[index].abilities[0].displayIcon;
  document.querySelector("img.attributes.two").src = weather.data[index].abilities[1].displayIcon;
  document.querySelector("img.attributes.three").src = weather.data[index].abilities[2].displayIcon;
  document.querySelector("img.attributes.four").src = weather.data[index].abilities[3].displayIcon;
  

  let div = document.querySelector("div.agentDisplay");
}


//  find out the length of the array then create a frame for each agent with picture, name and link