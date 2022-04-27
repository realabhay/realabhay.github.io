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

setInterval(getLocation, 1000);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(uploadPosition);
    } else { 
        body.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function uploadPosition(position) {
    document.body.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    console.log(Math.round(position.coords.latitude*10000)/10000 + " " + Math.round(position.coords.longitude*10000)/10000);
    db.update({
        coordinates: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
    });
}