
// SVG drawing area

var margin = {top: 40, right: 10, bottom: 60, left: 60};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Scales

var x = d3.scaleBand()
    .rangeRound([0, width])
	.paddingInner(0.1);

var y = d3.scaleLinear()
    .range([height, 0]);


// Initialize data
loadData();

// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
	// data getter
	get: function() { return _data; },
	// data setter
	set: function(value) {
		_data = value;
		// update the visualization each time the data property is set by using the equal sign (e.g. data = [])
		updateVisualization()
	}
});

// Load CSV file
function loadData() {
	d3.csv("data/coffee-house-chains.csv", function(error, csv) {

		csv.forEach(function(d){
			d.revenue = +d.revenue;
			d.stores = +d.stores;
		});

		// Store csv data in global variable
		data = csv;

        // updateVisualization gets automatically called within the data = csv call;
		// basically(whenever the data is set to a value using = operator);
		// see the definition above: Object.defineProperty(window, 'data', { ...
	});
}



d3.select("#ranking-type").on("change", updateVisualization);



// Render visualization

var xAxis = d3.axisBottom()
	.scale(x);

var yAxis = d3.axisLeft()
	.scale(y);

svg.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate("+(0)+"," + (height) + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "y-axis")
	.call(yAxis);


function updateVisualization() {

	var amount = d3.select("#ranking-type").property("value");


	data.sort(function(a, b) { return b[amount] - a[amount]; });

	x.domain(data.map(function(d) { return d.company; }));

	var maxY = d3.max(data, function(d) {
		if(amount === "stores"){
			return d.stores;
		}
		else{
			return d.revenue;
		}

	});

	y.domain([0, maxY]);

	svg.select(".x-axis")
		.transition()
		.duration(250)
		.call(xAxis);

	svg.select(".y-axis")
		.transition()
		.duration(250)
		.call(yAxis);

	var rect = svg.selectAll("rect")
		.data(data);
		// ;

	rect.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function (d) {
			return x(d.company);
		})
		.attr("y", function (d) {
			return y(d[amount]);
		})
		.attr("width", x.bandwidth())
		.attr("height", function (d) {
			return height - y(d[amount]);
		})
	// Enter and Update (set the dynamic properties of the elements)
		.merge(rect)
		.transition()
		.duration(250)
		.attr("y", function (d) {
			return y(d[amount]);
		})

		.attr("height", function (d) {
			return height - y(d[amount]);
		});


	// Exit
	rect.exit().remove();


}