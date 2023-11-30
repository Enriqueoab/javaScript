export class Map {

    constructor(coordinates) {
        this.render(coordinates)
    }

    render(coordinates){
        if (!google){
            alert("Could not render google maps!");
            return;
        }

        document.getElementById('map').innerHTML = ''; // clear the <p> in the <div id="map">
        // const map = new google.maps.Map(document.getElementById("map"), 
        // {
        //     center: coordinates,
        //     zoom: 16
        // });

        // new google.maps.Marker(
        // {
        //     position: coordinates,
        //     map: map
        // });

        const map = new ol.Map({
            target: 'map',
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
              zoom: 16
            })
          });
    }

}