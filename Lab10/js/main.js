
var allData = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {

    // Proxy url
    var proxyUrl = 'http://michaeloppermann.com/proxy.php?format=xml&url=';

    // Hubway XML station feed
    var url = 'https://member.bluebikes.com/data/stations/bikeStations.xml';

    // TO-DO: LOAD DATA

    // Send an asynchronous HTTP request with jQuery
    $.getJSON(proxyUrl+url, function (jsonData) {
        console.log(jsonData);
        // Extract list with stations from JSON response
        alldata = jsonData.station;
        console.log(alldata);


        createVis();

    });


    function createVis() {

        // TO-DO: INSTANTIATE VISUALIZATION

        // Show number of stations with JQuery
        var stations = (alldata.length).toString();
        console.log(stations);
        $("#station-count").text(stations);

        // Instantiate visualization object (bike-sharing stations in Boston)
        stationMap = new StationMap("stationMap", alldata, [42.360081, -71.058884]);

        console.log(stationMap);
    }
}