
// SVG Size
// Margin object with properties for the four directions: BONUS!
var margin = {top: 100, right: 50, bottom: 100, left: 80};

// Width and height as the inner dimensions of the chart area
var width = 760 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;


// Load CSV file
d3.csv("data/wealth-health-2014.csv", function(data){

	// Analyze the dataset in the web console
	//Convert to numbers

	data.forEach(function(d){
		d.LifeExpectancy = +d.LifeExpectancy;
		d.Income = +d.Income;
		d.Population = +d.Population;
	});

	for (var i = 0; i < data.length; i++) {
		var max = 0;
		var maxIndex = 0;
		var switcher;
		for (var j = i; j < data.length; j++) {
			if (data[j].Population > max) {
				max = data[j].Population;
				maxIndex = j;

			}

		}
		if (max != 0) {
			switcher = data[i];
			data[i] = data[maxIndex];
			data[maxIndex] = switcher;
		}
	}
	console.log(data);
	console.log("Countries: " + data.length);

	//Append a new SVG area
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var maxInc = d3.max(data, function(d) {
		return d.Income;
	});

	var minInc = d3.min(data, function(d) {
		return d.Income;
	});

	var maxLife = d3.max(data, function(d) {
		return d.LifeExpectancy;
	});


	var minLife = d3.min(data, function(d) {
		return d.LifeExpectancy;
	});

	var maxPop = d3.max(data, function(d) {
		return d.Population;
	});


	var minPop = d3.min(data, function(d) {
		return d.Population;
	});

	var maxReg = d3.max(data, function(d) {
		return d.Region;
	});


	var minReg = d3.min(data, function(d) {
		return d.Region;
	});

	//Create scales, refined

	var incomeScale = d3.scaleLog()
		.domain([minInc, maxInc])
		.range([0, width]);


	var lifeExpectancyScale = d3.scaleLinear()
		.domain([minLife-10, maxLife+10])
		.range([height, 0]);

	var linearScale = d3.scaleLinear()
		.domain([minPop, maxPop])
		.range([4,30]);

	var regions = ["Sub-Saharan Africa", "East Asia & Pacific", "America", "Middle East & North Africa", "Europe & Central Asia"];

	var colorScale = d3.scaleLinear()
		.domain([0,4])
		.range(["darkgreen","lightgreen"]);

	//Check
	console.log(incomeScale(5000));
	console.log(lifeExpectancyScale(68));

	var group = svg.append("g");

	//Map countries to SVG circles

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("fill", function(d) {
			return colorScale(regions.indexOf(d.Region));
		})
		.attr("stroke", function(d) {
			return colorScale(d.Region);
		})
		.attr("r", function(d) {
			return linearScale(d.Population);
		})
		.attr("cx", function(d){
			return incomeScale(d.Income);
		})
		.attr("cy", function(d){
			return lifeExpectancyScale(d.LifeExpectancy)
		})
		.attr("transform", "translate("+(0)+"," + (0) + ")");

	//Create axes, with scales

	var xAxis = d3.axisBottom()
		.scale(incomeScale)
		.ticks(5)
		.tickValues([1000, 2000, 4000, 8000, 16000, 32000, 100000])
		.tickFormat(d3.format(".0s"));

	var yAxis = d3.axisLeft()
		.scale(lifeExpectancyScale);

	//Append axes

	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate("+(0)+"," + (height) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate("+(0)+"," + (0) + ")")
		.call(yAxis);

	///Label axes

	svg.append("text")
		.attr("x", 200)
		.attr("y", height+50)
		.text("Income per Person (GDP per Capita)");

	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -30)
		.attr("x", -200)
		.text("Life Expectancy")

});