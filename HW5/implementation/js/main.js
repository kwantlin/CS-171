
// SVG drawing area


var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 600 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.attr("fill", "pink")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Date parser
var formatDate = d3.timeFormat("%Y");
var parseDate = d3.timeParse("%Y");


// Initialize data
loadData();

// FIFA world cup
var data;


// Load CSV file
function loadData() {
	d3.csv("data/fifa-world-cup.csv", function(error, csv) {

		csv.forEach(function(d){
			// Convert string to 'date object'
			d.YEAR = parseDate(d.YEAR);
			
			// Convert numeric values to 'numbers'
			d.TEAMS = +d.TEAMS;
			d.MATCHES = +d.MATCHES;
			d.GOALS = +d.GOALS;
			d.AVERAGE_GOALS = +d.AVERAGE_GOALS;
			d.AVERAGE_ATTENDANCE = +d.AVERAGE_ATTENDANCE;
		});

		// Store csv data in global variable
		data = csv;

		// Draw the visualization for the first time
		updateVisualization();
	});
}

var x = d3.scaleTime()
	.range([0, width+margin.right-5]);

var y = d3.scaleLinear()
	.range([height, 0]);

var xAxis = d3.axisBottom()
	.scale(x);

var yAxis = d3.axisLeft()
	.scale(y);

svg.append("g")
	.attr("class", "axis x-axis")
	.attr("transform", "translate("+(0)+"," + (height) + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "axis y-axis")
	.call(yAxis);

d3.select("#ranking-type").on("change", updateVisualization);
// d3.select("#myNumber1").on("change", updateVisualization);
// d3.select("#myNumber2").on("change", updateVisualization);
d3.select("#submitbutton").on("click", updateVisualization);


// Render visualization
function updateVisualization() {

	var amount = d3.select("#ranking-type").property("value");
	console.log(amount);
	console.log(data);
	data.forEach(function(d){
		console.log(parseInt(formatDate(d.YEAR)));
	});

	var start1 = new Date(document.getElementById("myNumber1").value);
	console.log(start1);
	var year1 = formatDate(start1);
	var year1Int = parseInt(year1);
	// console.log(year1);
	var start2 = new Date(document.getElementById("myNumber2").value);
	var year2 = formatDate(start2);
	var year2Int = parseInt(year2);



	// console.log(year1);
	// var yearInt = parseInt(year1);
	// console.log(yearInt);
	//
	// console.log(year2);

	var maxDate = parseDate(d3.max(data, function(d) {
		return formatDate(d.YEAR);
	}));


	console.log(maxDate);

	var minDate = parseDate(d3.min(data, function(d) {
		return formatDate(d.YEAR);
	}));



	console.log(minDate);



	x.domain([start1, start2]);

	var maxY = d3.max(data, function(d) {
		if(amount ==="goals") {
			return d.GOALS;
		}
		else if(amount==="avggoals"){
			return d.AVERAGE_GOALS;
		}
		else if(amount==="matches"){
			return d.MATCHES;
		}
		else if(amount==="teams"){
			return d.TEAMS;
		}
		else if(amount==="avgattn"){
			return d.AVERAGE_ATTENDANCE;
		}
	});

	console.log(maxY);

	y.domain([0, maxY]);


	svg.select(".x-axis")
		.transition()
		.duration(800)
		.call(xAxis);

	svg.select(".y-axis")
		.transition()
		.duration(800)
		.call(yAxis);

	var line = svg.selectAll(".line")
		.data([data], );

	line.enter().append("path")
		.attr("class", "line")
		// Enter and Update (set the dynamic properties of the elements)
		.merge(line)
		.transition()
		.duration(800)
		.style("stroke-opacity", function(d){
			if(parseInt(formatDate(d.YEAR))<year2Int){
				return 1;
			}
			else{
				return 0;
			}

		})
		.attr("d", d3.line()
		.x(function(d) {
			if(parseInt(formatDate(d.YEAR))>year1Int){
				console.log(d.YEAR);
				return x(d.YEAR);
			}

		})
		.y(function(d) {
			if(amount ==="goals" && parseInt(formatDate(d.YEAR))>year1Int) {
				return y(d.GOALS);
			}
			else if(amount==="avggoals"&& parseInt(formatDate(d.YEAR))>year1Int){
				return y(d.AVERAGE_GOALS);
			}
			else if(amount==="matches"&& parseInt(formatDate(d.YEAR))>year1Int){
				return y(d.MATCHES);
			}
			else if(amount==="teams"&& parseInt(formatDate(d.YEAR))>year1Int){
				return y(d.TEAMS);
			}
			else if(amount==="avgattn"&& parseInt(formatDate(d.YEAR))>year1Int){
				return y(d.AVERAGE_ATTENDANCE);
			}
		}));


	// Exit
	line.exit().remove();


	var tool_tip = d3.tip()
		.attr("class", "d3-tip")
		.offset([-8, 0])
		.html(function(d) {
			if (amount === "goals") {
				return d.EDITION + "</br>" + "Y-Axis Value: " + d.GOALS;
			} else if (amount === "avggoals") {
				return d.EDITION + "</br>" + "Y-Axis Value: " + d.AVERAGE_GOALS;
			} else if (amount === "matches") {
				return d.EDITION + "</br>" + "Y-Axis Value: " + d.MATCHES;
			} else if (amount === "teams") {
				return d.EDITION + "</br>" + "Y-Axis Value: " + d.TEAMS;
			} else if (amount === "avgattn") {
				return d.EDITION + "</br>" + "Y-Axis Value: " + d.AVERAGE_ATTENDANCE;
			}
		});

			svg.call(tool_tip);

			var circ = svg.selectAll("circle")
				.on('mouseover', tool_tip.show)
				.on('mouseout', tool_tip.hide)
				.on("click", showEdition)
				.data(data);

			circ.enter().append("circle")
				.attr("class", "tooltip-circle")
				.attr("cx", function (d) {
					return x(d.YEAR);
				})
				.attr("cy", function (d) {
					if (amount === "goals") {
						return y(d.GOALS);
					} else if (amount === "avggoals") {
						return y(d.AVERAGE_GOALS);
					} else if (amount === "matches") {
						return y(d.MATCHES);
					} else if (amount === "teams") {
						return y(d.TEAMS);
					} else if (amount === "avgattn") {
						return y(d.AVERAGE_ATTENDANCE);
					}
				})
				.attr("r", 5)
				// Enter and Update (set the dynamic properties of the elements)
				.merge(circ)
				.style("fill", function(d){
					if(parseInt(formatDate(d.YEAR))<year1Int){
						return "lightskyblue";
					}
				})
				.transition()
				.duration(800)
				.attr("cx", function (d) {
					return x(d.YEAR);
				})
				.attr("cy", function (d) {
					if (amount === "goals") {
						return y(d.GOALS);
					} else if (amount === "avggoals") {
						return y(d.AVERAGE_GOALS);
					} else if (amount === "matches") {
						return y(d.MATCHES);
					} else if (amount === "teams") {
						return y(d.TEAMS);
					} else if (amount === "avgattn") {
						return y(d.AVERAGE_ATTENDANCE);
					}
				});


			// Exit
			circ.exit().remove();


		}

// Show details for a specific FIFA World Cup
function showEdition(d){
		d3.select(this)
				.each(function (d) {
					document.getElementById("edition").innerHTML = d.EDITION;
					document.getElementById("winner").innerHTML = "Winner: " +d.WINNER;
					document.getElementById("goals").innerHTML = "Goals: " + d.GOALS;
					document.getElementById("averagegoals").innerHTML = "Average Goals: " + d.AVERAGE_GOALS;
					document.getElementById("matches").innerHTML = "Matches: " + d.MATCHES;
					document.getElementById("teams").innerHTML = "Teams: " + d.TEAMS;
					document.getElementById("teams").innerHTML = "Average Attendance: " + d.AVERAGE_ATTENDANCE + " people";
				});
}
