
/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

StationMap = function(_parentElement, _data, _location) {

	this.parentElement = _parentElement;
	this.data = _data;
	this.location = _location;
	this.initVis();
}


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
	var vis = this;

	var map = L.map('station-map').setView(vis.location, 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.Icon.Default.imagePath = 'img/';

	var marker = L.marker([42.378774, -71.117303]).addTo(map);

	bikeStations = L.layerGroup().addTo(map);

    $.getJSON("data/MBTA-Lines.json", function(data) {
        console.log(data);
        var subwayLines = L.geoJson(data.features, {
            style: styleLines,
            weight: 2,
            fillOpacity: 0.8
        }).addTo(map);
        function styleLines(features) {
            switch (features.properties.LINE) {
                case 'GREEN': 	return { color: "green" };
                case 'SILVER': 		return { color: "grey" };
                case 'RED': 			return { color: "red" };
                case 'BLUE': 			return { color: "blue" };
                case 'ORANGE': 			return { color: "orange" };
            }
        }
    });



	vis.wrangleData();
};


/*
 *  Data wrangling
 */

StationMap.prototype.wrangleData = function() {
	var vis = this;

	// Currently no data wrangling/filtering needed
	// vis.displayData = vis.data;

	// Update the visualization
	vis.updateVis();

}


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {

	var vis = this;

	myData = vis.data;

	bikeStations.clearLayers();

	myData.forEach(function(d){
		var newStation = L.marker([d.lat, d.long]).bindPopup("Station Name: " + d.name + "<br>" + "Available Bikes: "+ d.nbBikes + "<br>" + "Available Docks: "+ d.nbEmptyDocks);
		bikeStations.addLayer(newStation);
	});



};
