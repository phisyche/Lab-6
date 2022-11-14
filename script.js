mapboxgl.accessToken = 'pk.eyJ1Ijoiby1ycGhldXMiLCJhIjoiY2pzN3F6YThqMGpseDQzb2ttYWJmZ2VmZCJ9.6FyHKQF5WOqnQi3mQVI2Fw'
const map = new mapboxgl.Map({
    // Settings from which we initialize the map.
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-103.2502, 29.2498], // starting position [lng, lat]
    zoom: 2.8, // starting zoom
    pitch: 20,
    bearing: 20, 
     //globe projection rather than the default web mercator
    projection: 'globe',
    });


    //load the Big Bend Trails data file from the data folder
    map.on('load', () => {
        map.addSource('trails', {
            type: 'geojson',
            data: 'data/Big_Bend_Trails.geojson' 
        });
    
        map.addLayer({
          'id': 'trails-layer',
          'type': 'line',
          'source': 'trails',
          'paint': {
              'line-width': 3,
              'line-color': ['match', ['get', 'TRLCLASS'],
              'Class 1: Minimally Developed', 'red',
              'Class 2: Moderately Developed', 'orange',
              'Class 3: Developed', 'yellow',
              /*else,*/ 'blue'
          ]
          }
        });

        //load the Big Bends and Bounds GeoJSON data from the data folder.
        map.addSource('bounds', {
            type: 'geojson',
            data: 'data/BigBendBounds.geojson'
        });
    
        map.addLayer({
          'id': 'boundary-layer',
          'type': 'line',
          'source': 'bounds',
          'paint': {
              'line-width': 4,
              'line-color': 'black',
              'line-opacity': .6
          }
        });
    });

    
    map.on('load', function () {
        map.addSource('mapbox-dem', {
            "type": "raster-dem",
            "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
            'tileSize': 512,
            'maxzoom': 14
        });
        // Render the map in 3D using the setTerrain method
         map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.0});

         // Add sky using the map.Setfog method.
         map.setFog({
            'range': [-1, 2],
            'horizon-blend': 0.3,
            'color': 'white',
            'high-color': '#add8e6',
            'space-color': '#d8f2ff',
            'star-intensity': 0.0
        });
         
     });
    
     
    // Add a control to adjust view at the top right corner of the page. 
    const navControl = new mapboxgl.NavigationControl({
        visualizePitch: true
    });
    map.addControl(navControl, 'top-right');