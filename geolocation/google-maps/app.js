const firebaseConfig = {
  apiKey: "AIzaSyCMY1PXBLfNnIxj0wDyfo72LXOaHLiqk7Y",
  authDomain: "miniproject-57702.firebaseapp.com",
  projectId: "miniproject-57702",
  storageBucket: "miniproject-57702.appspot.com",
  messagingSenderId: "725696116253",
  appId: "1:725696116253:web:90dfc7e3de12806a4f38f4"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const mai = firebase.firestore()
const db = mai.collection('location').doc('pneSyKCP49xZWE6Gpq4K');


mapboxgl.accessToken = 'pk.eyJ1IjoibXJicm93bjM1Nzc1MyIsImEiOiJjbDJkaWkwdW8wMDR2M2pwY3N1dW9lZjMxIn0.uxOUN6yYTNNLkopgEPvHBw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })

var longitude;
var latitude;
var centeredOnce = false;

function successLocation(position)
{
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation()
{

}

var map;

function setupMap(center)
{
    map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: center,
    zoom: 16
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
    new MapboxDirections({
    accessToken: 'pk.eyJ1IjoibXJicm93bjM1Nzc1MyIsImEiOiJjbDJkaWkwdW8wMDR2M2pwY3N1dW9lZjMxIn0.uxOUN6yYTNNLkopgEPvHBw'
    }),
    'top-left'
    );

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [73.02419,19.04695]
          },
          properties: {
            title: 'Bus Stop',
            description: 'LP Bus Stop'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [73.02445,19.04587]
          },
          properties: {
            title: 'Bus Stop',
            description: 'DY PATIL Bus Stop'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [73.02302579655598, 19.044382161565384]
          },
          properties: {
            title: 'Bus Stop',
            description: 'Shivaji Maharaj Chowk'
          }
        }
      ]
  };

  // add markers to map
  for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
  .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
    )
  .addTo(map);
  
  }
    
}

async function showBus(){
    // Get the initial location of the International Space Station (ISS).
    const geojson = await getLocation();
    // Add the ISS location as a source.
    map.addSource('iss', {
      type: 'geojson',
      data: geojson
    });
    // Add the rocket symbol layer to the map.
    map.addLayer({
      'id': 'iss',
      'type': 'symbol',
      'source': 'iss',
      'layout': {
        // This icon is a part of the Mapbox Streets style.
        // To view all images available in a Mapbox style, open
        // the style in Mapbox Studio and click the "Images" tab.
        // To add a new image to the style at runtime see
        // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
        'icon-image': 'rocket-15'
      }
    });

    // Update the source from the API every 2 seconds.
    const updateSource = setInterval(async () => {
      const geojson = await getLocation(updateSource);
      map.getSource('iss').setData(geojson);
    }, 2000);

    async function getLocation(updateSource) { 
        
        await db.get().then((data) =>{
          longitude = data.data().coordinates._long; 
          latitude = data.data().coordinates._lat;
          console.log(data.data().coordinates._lat);
        })

        console.log(latitude);

        // Fly the map to the location.
        if (centeredOnce == false){
          map.flyTo({
            center: [longitude, latitude],
            speed: 0.5
          });
          centeredOnce=true;
        }

        console.log(longitude);

        // Return the location of the ISS as GeoJSON.
        return {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [longitude, latitude]
              }
            }
          ]
        };
      
    }
}

function busSelect(){
  var stop = document.querySelector("#busStopField").value
  var A = document.querySelector('.mapboxgl-ctrl-geocoder');

  switch(stop) {
    case "DY Patil Bus Stop":
      //focus on the bus stop
      map.flyTo({
        center: [73.02445,19.04587],
        speed: 1,
        zoom: 17
      });
      //document.querySelector('div.mapboxgl-ctrl-geocoder').childNodes[1].value = "73.02445,19.04587";
      //document.querySelectorAll("div.marker")[0].click();
      break;
    case "LP Bus Stop":
      // code block
      map.flyTo({
        center: [73.02419,19.04695],
        speed:1,
        zoom: 17
      });
      //document.querySelector('div.mapboxgl-ctrl-geocoder').childNodes[1].value = "73.02419,19.04695";
      //document.querySelectorAll("div.marker")[1].click();
      break;
    case "Shivaji Maharaj Chowk":
      map.flyTo({
        center: [73.02302579655598, 19.044382161565384],
        speed: 1,
        zoom: 17
      });
      //var elem = document.querySelectorAll("div.marker")[2];
      //document.querySelector('div.mapboxgl-ctrl-geocoder').childNodes[1].value = "73.0230257, 19.044382";
      //elem.click();
      break;
    default:
      console.log("error in busSelect()");
  }
}