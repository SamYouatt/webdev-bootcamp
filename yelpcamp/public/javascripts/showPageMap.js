mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: campgroundInfo.geometry.coordinates,
    zoom: 9
});

var marker = new mapboxgl.Marker()
    .setLngLat(campgroundInfo.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${campgroundInfo.title}`
            )
    )
    .addTo(map);