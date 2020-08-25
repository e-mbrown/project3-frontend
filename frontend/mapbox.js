mapboxgl.accessToken = 'pk.eyJ1IjoiZWJzb25hcmkiLCJhIjoiY2tlN2V3ejB0MTh3NjJycXY5dWI3NDZwcyJ9.FYsqJqvdaamnEcpWF6d-mQ';


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 1.6
});

const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-73.986, 40.708]
            },
            properties: {
                title: 'Mapbox',
                description: 'New York City'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-220.235, 35.692]
            },
            properties: {
                title: 'Mapbox',
                description: 'Tokyo, Japan'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-118.242, 34.071]
            },
            properties: {
                title: 'Mapbox',
                description: 'Los Angeles, California'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-717.657, 48.884]
            },
            properties: {
                title: 'Mapbox',
                description: 'Paris, France'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-720.125, 51.508]
            },
            properties: {
                title: 'Mapbox',
                description: 'London, United Kingdom'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-208.766, -33.854]
            },
            properties: {
                title: 'Mapbox',
                description: 'Sydney, Australia'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-347.516, 41.896]
            },
            properties: {
                title: 'Mapbox',
                description: 'Rome, Italy'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-418.434, -34.646]
            },
            properties: {
                title: 'Mapbox',
                description: 'Buenos Aires, Argentina'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-341.583, -33.930]
            },
            properties: {
                title: 'Mapbox',
                description: 'Cape Town, South Africa'
            }
        },
    ]
};

geojson.features.forEach(function(marker) {
    const mark = document.createElement('div');
    mark.className = 'marker';
    new mapboxgl.Marker(mark)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map)
})