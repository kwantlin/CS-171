
// SVG drawing area

var margin = {top: 40, right: 10, bottom: 60, left: 100};

var width = 2000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

// Initialize data

d3.csv("data/global-malaria-2015.csv", function(error, csv) {

    csv.forEach(function (d) {
        d.UN_population = +d.UN_population;
        d.At_risk = +d.At_risk;
        d.At_high_risk = +d.At_high_risk;
        d.Suspected_malaria_cases = +d.Suspected_malaria_cases;
        d.Malaria_cases = +d.Malaria_cases;
        if (!(d.Malaria_cases>=0)){
            d.Malaria_cases = 0;
        }
    });



    // Store csv data in global variable
    data = csv;

    data.sort(function(a, b) {
        return a.WHO_region - b.WHO_region || b.Malaria_cases - a.Malaria_cases;
    });

    data = data.filter(cases => cases.Malaria_cases > 500000);

    console.log(data);

    // updateVisualization gets automatically called within the data = csv call;
    // basically(whenever the data is set to a value using = operator);
    // see the definition above: Object.defineProperty(window, 'data', { ...



// Render visualization

var maxCol = d3.max(csv, function (d) {
    return d.Malaria_cases;
});

// console.log(maxCol);

var xbar = d3.scaleBand()
            .domain(data.map(function(d) { return d.Code; }))
            .rangeRound([0, width/3])
            .paddingInner(0.1);

var ybar = d3.scaleLinear()
    .domain([0, maxCol])
    .range([height , 0]);

// console.log(csv[2].Malaria_cases);

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .transition()
    .duration(800)
    .attr("fill", "rgb(222, 64, 2)")
    //Chose color as combination of blood red and orange from choropleth to achieve synergy
    .attr("width", xbar.bandwidth())
    .attr("height", function (d, index) {
        // console.log(height - ybar(d.Malaria_cases), index, d.Code);
        console.log(d.Malaria_cases);
        console.log(height- margin.top - ybar(d.Malaria_cases));
        return height-ybar(d.Malaria_cases);
    })
    .attr("y", function (d) {
        return ybar(d.Malaria_cases);
    })
    .attr("x", function (d) {
        return xbar(d.Code);
    });
    // .attr("transform", "translate(" + (30) + "," + (-30) + ")");

var xBarAxis = d3.axisBottom()
    .scale(xbar);

var yBarAxis = d3.axisLeft()
    .scale(ybar);

svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate("+(0)+"," + (height ) + ")")
    .call(xBarAxis);

svg.append("g")
    .attr("class", "axis y-axis")
    // .attr("transform", "translate(" + (60) + "," + (30) + ")")
    .call(yBarAxis);

    var texts2 = svg.selectAll("labels")
        .data(data);

    texts2.enter().append("text")
        .attr("class", "labels")
        .merge(texts2)
        .transition()
        .duration(800)
        .attr("x", function (d) {
            return xbar(d.Code)+3;
        })
        .attr("y", function (d) {
            return ybar(d.Malaria_cases);
        })
        .attr("text-anchor", "right")
        .attr("width", function(d){
            return xbar(d.Malaria_cases);
        })
        .text(function(d){
            return Math.floor((d.Malaria_cases)/(d.UN_population)*100) + "%";
        });
    svg.append("text")
        .attr("class", "axis-label")
        .attr('x', -80)
        .attr('y', -15)
        .text("Number of Malaria Cases");

    svg.append("text")
        .attr("class", "axis-label")
        .attr('x', 640)
        .attr('y', 400)
        .text("Countries");
    svg.append("text")
        .attr("class", "axis-label")
        .attr('x', 638)
        .attr('y', 412)
        .text("(with more than 500,000 Cases)");

});