// SVG Size
var width = 700,
	height = 500;

var margin = 60;


// Load CSV file
d3.csv("data/zaatari-refugee-camp-population.csv", function(data){

	// Analyze the dataset in the web console

	data.forEach(function(d){
		d.population = +d.population;
		d.date = new Date(d.date);
	});

	console.log(data);
	console.log(data[2]);

	var maxDate = d3.max(data, function(d) {
		return d.date;
	});
	console.log(maxDate);

	var minDate = d3.min(data, function(d) {
		return d.date;
	});
	console.log(minDate);

	var maxPop = d3.max(data, function(d) {
		return d.population;
	});
	console.log(maxDate);

	var minPop = d3.min(data, function(d) {
		return d.population;
	});
	console.log(minDate);
	//Create scales

	var x = d3.scaleTime()
		.domain([minDate, maxDate])
		.range([margin, width-margin]);

	var y = d3.scaleLinear()
		.domain([0, maxPop])
		.range([height-margin, margin]);

	var svg = d3.select(".column1").append("svg")
		.attr("width", width)
		.attr("height", height);

	//Define a function that generates the area

	var area = d3.area()
		.x(function(d) { return x(d.date); })
		.y0(height-60)
		.y1(function(d) { return y(d.population); });

	var line = d3.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.population); });

	//Draw the area

	var path = svg.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area)
		.attr("transform", "translate("+(30)+"," + (30) + ")");

	var path = svg.append("path")
		.datum(data)
		.attr("class", "linestyle")
		.attr("d", line)
		.attr("transform", "translate("+(30)+"," + (30) + ")");

	var xAxis = d3.axisBottom()
		.scale(x)
		.tickFormat(d3.time.format("%b %Y"));

	var yAxis = d3.axisLeft()
		.scale(y);

	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate("+(30)+"," + (height-30) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate("+(90)+"," + (30) + ")")
		.call(yAxis);

	// Add tooltip

	var div = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	svg.selectAll("circle")
		.data(data)
		.enter().append("circle")
		.attr("r", 2)
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.population); })
		.attr("transform", "translate("+(30)+"," + (30) + ")")
		.on("mouseover", function(d) {
			div.transition()
				.duration(200)
				.style("opacity", .9);
			div.html((d.date) + "<br/> Pop: <br/>" + d.population)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			div.transition()
				.duration(500)
				.style("opacity", 0);
		});

		var shelters = [
			{
				type: "caravan",
				percent: .7968,
			},
			{
				type: "combo",
				percent: .1081,
			},
			{
				type: "tent",
				percent: .0951,
			}
		];

		var maxCol = d3.max(shelters, function (d) {
			return d.percent;
		});

		var xbar = d3.scaleLinear()
			.domain([0, 0])
			.range([margin, width - margin]);

		var ybar = d3.scaleLinear()
			.domain([0, maxCol])
			.range([height - margin, margin]);

		var svg2 = d3.select(".column2").append("svg")
			.attr("width", width)
			.attr("height", height);

		svg2.selectAll("rect")
			.data(shelters)
			.enter()
			.append("rect")
			.attr("fill", "green")
			.attr("height", function (d, index) {
				return height - margin - ybar(shelters[index].percent);
			})
			.attr("width", width / 7)
			.attr("y", function (d, index) {
				return margin + (ybar(shelters[index].percent));
			})
			.attr("x", function (d, index) {
				return ((index + 1) * (width - 2 * margin) / 4 - 15);
			})
			.attr("transform", "translate(" + (30) + "," + (-30) + ")");

		var xBarAxis = d3.axisBottom()
			.scale(xbar)
			.ticks(3);

		var yBarAxis = d3.axisLeft()
			.scale(ybar)
			.tickFormat(d3.format(".0%"));

		svg2.append("g")
			.attr("class", "axis x-axis")
			.attr("transform", "translate(" + (0) + "," + (height - 30) + ")")
			.call(xBarAxis);

		svg2.append("g")
			.attr("class", "axis y-axis")
			.attr("transform", "translate(" + (60) + "," + (30) + ")")
			.call(yBarAxis);

//Bar labels
	svg2.append("text")
		.attr("class", "axis")
		.attr("class", "text-style")
		.attr("y", height - 420)
		.attr("x", 188)
		.text("79.68%");

	svg2.append("text")
		.attr("class", "axis")
		.attr("class", "text-style")
		.attr("y", height - 95)
		.attr("x", 330)
		.text("10.81%");

	svg2.append("text")
		.attr("class", "axis")
		.attr("class", "text-style")
		.attr("y", height - 95)
		.attr("x", 490)
		.text("9.51%");


		svg2.append("text")
			.attr("class", "axis")
			.attr("class", "text-style")
			.attr("y", height - 10)
			.attr("x", 188)
			.text("Caravan");



		svg2.append("text")
			.attr("class", "axis")
			.attr("class", "text-style")
			.attr("y", height - 10)
			.attr("x", 330)
			.text("Combination*");

		svg2.append("text")
			.attr("class", "axis")
			.attr("class", "text-style")
			.attr("y", height - 10)
			.attr("x", 490)
			.text("Tent");

		//Add chart titles

		svg.append("text")
			.attr("class", "heading")
			.attr("y", 50)
			.attr("x", 270)
			.text("Camp Population");

		svg2.append("text")
			.attr("class", "heading")
			.attr("y", 50)
			.attr("x", 270)
			.text("Type of Shelter");

});