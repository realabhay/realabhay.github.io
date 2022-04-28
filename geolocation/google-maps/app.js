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
            description: 'CST Bus Stop'
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
        map.flyTo({
          center: [longitude, latitude],
          speed: 0.5
        });

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

