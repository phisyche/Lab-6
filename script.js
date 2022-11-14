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
        map.on('click', 'trails-layer', (e) => {
            const trail_name = e.features[0].properties.TRLNAME;
            const property_name = e.features[0].properties.UNITNAME;

            while (Math.abs(e.lngLat.lng - trail_name[0]) > 180) {
            trail_name[0] += e.lngLat.lng > trail_name[0] ? 360 : -360;
            }
             
            new mapboxgl.Popup()
            .setLngLat(trail_name)
            .setHTML(property_name)
            .addTo(map);
            });
             
            // Cursor changes to a pointer when the mouse is over the trails layer.
            map.on('mouseenter', 'trails-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'trail-layer', () => {
            map.getCanvas().style.cursor = '';
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






    // /// popus

     
    // // When a click event occurs on a feature in the places layer, open a popup at the
    // // location of the feature, with description HTML from its properties.
    // map.on('click', 'trails-layer', (e) => {
    // // Copy coordinates array.
    // const coordinates = e.features[0].geometry.coordinates.slice();
    // const description = e.features[0].properties.description;
     
    // // Ensure that if the map is zoomed out such that multiple
    // // copies of the feature are visible, the popup appears
    // // over the copy being pointed to.
    // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    // coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }
     
    // new mapboxgl.Popup()
    // .setLngLat(coordinates)
    // .setHTML(description)
    // .addTo(map);
    // });
     
    // // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'trails-layer', () => {
    // map.getCanvas().style.cursor = 'pointer';
    // });
     
    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'places', () => {
    // map.getCanvas().style.cursor = '';
    // });
