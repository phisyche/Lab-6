mapboxgl.accessToken = 'pk.eyJ1Ijoiby1ycGhldXMiLCJhIjoiY2xhZTdqcGh1MGRybDN3bzYybHZtNnB1NyJ9.MYjEhC4VLsZGi25rlSLqgQ'
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-103.2502, 29.2498], // starting position [lng, lat]
    zoom: 1.5, // starting zoom
    //pitch: 85,
    //bearing: 80, 
    projection: 'globe', //globe projection rather than the default web mercator
    });