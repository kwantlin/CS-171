// Sources:
// https://bl.ocks.org/dnprock/b48388ee8bc5582947b6
// https://github.com/lvonlanthen/data-map-d3/blob/step-12/map.js
//file:///Users/kwantlin/Downloads/1278-Article%20Text-6253-3-10-20150513.pdf
//https://leafletjs.com/examples/choropleth/
//http://zeroviscosity.com/d3-js-step-by-step/step-3-adding-a-legend

// --> CREATE SVG DRAWING AREA
var amount = "UN_population";

var w = 800;
var h = 600;

//Define map projection
var projection = d3.geoMercator()
    .translate([w/2, h/2+40])
    .scale([400]);

//Define path generator
var path = d3.geoPath()
    .projection(projection);

//Define quantize scale to sort data values into buckets of color
var color = d3.scaleQuantize()
    .range(["rgb(255, 225, 171)","rgb(255, 199, 97)","rgb(255, 165, 0)","rgb(191, 125, 4)","rgb(122, 79, 0)"]);
// Colors derived from adding shades of black and white to an orange tone and adjusted manually to achieve greatest clarity

var countriesByCode = d3.nest()
    .key(function(d) { return d.Code; })
    .entries("data/global-malaria-2015.csv");

console.log(countriesByCode);

//Create SVG element
var svg1 = d3.select("#choro")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var africa;
var data;
var csv;

// Use the Queue.js library to read two files
queue()
  .defer(d3.json, "data/africa.topo.json")
  .defer(d3.csv, "data/global-malaria-2015.csv")
  .await(function(error, mapTopJson, malariaDataCsv){

      malariaDataCsv = malariaDataCsv.filter(region => region.WHO_region === "African");

      malariaDataCsv.forEach(function(d) {
          d.UN_population = +d.UN_population;
          d.At_risk = +d.At_risk;
          d.At_high_risk = +d.At_high_risk;
          d.Suspected_malaria_cases = +d.Suspected_malaria_cases;
          d.Malaria_cases = +d.Malaria_cases;
          if(!(d.UN_population)>0){
              d.UN_population = 0;
          }
          if(!(d.At_risk)>0){
              d.At_risk = 0;
          }
          if(!(d.At_high_risk)>0){
              d.At_high_risk = 0;
          }
          if(!(d.Suspected_malaria_cases)>0){
              d.Suspected_malaria_cases = 0;
          }
          if(!(d.Malaria_cases)>0){
              d.Malaria_cases = 0;
          }
      });

      countriesByCode = d3.nest()
          .key(function(d) { return d.Code; })
          .entries(malariaDataCsv);
        console.log(countriesByCode);

        // --> PROCESS DATA

        // console.log(color.domain());
        //
        // console.log(malariaDataCsv);
        // console.log(mapTopJson);
        // console.log("processed?");
        africa = mapTopJson;
        data = malariaDataCsv;
      africa = topojson.feature(africa, africa.objects.collection).features;

        // Update choropleth
        updateChoropleth(amount);
    });



function updateChoropleth(amount) {
    // console.log(color.domain());
    checked = amount;
    console.log(checked);
    color.domain([d3.min(data, function(d) {
        return d[checked];
    }),
        d3.max(data, function(d) {
            return d[checked];
        })]);

    console.log(color.domain());



    csv = data;

    // console.log(csv);
    // console.log(countriesByCode);
    // countriesByCode.forEach(function(data){
    //     console.log(data.key)
    // });
    // console.log(countriesByCode[1].values[0].UN_population);
    // console.log(map);


    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([15, -5])
        .html(function(d) {
            var text = "";
            value = d.properties.adm0_a3;
            countriesByCode.forEach(function(data){
                if (value == data.key ) {
                    text =  "Region: " + data.values[0].Country + "<br> UN Population: "+ data.values[0].UN_population + " people<br>At high risk: " + data.values[0].At_high_risk + "<br>At  risk: " + data.values[0].At_risk + "<br>Suspected malaria cases: " + data.values[0].Suspected_malaria_cases + "<br>Malaria cases: " + data.values[0].Malaria_cases;
                }
            });
            if(text == ""){
                return "No Data"
            }
            return text;
        });

    svg1.call(tip);

    // svg1.selectAll("path")
    //     .data(map)
    //     .enter()
    //     .append("path")
    //     .attr("d", path);
    var dict = {};
    counter = 0;
    // Draw the map
    svg1.selectAll("path")
        .append("g")
        .data(africa)
        .enter()
        .append("path")
        // draw each country
        .attr("d", path
        )
        // set the color of each country
        .attr("fill", function (d) {
            var amount = 0;
            var value = d.properties.adm0_a3;
            countriesByCode.forEach(function(data){
                if (value == data.key && (!(value in dict))) {
                    dict[value] = 1;
                    amount = data.values[0][checked];
                    // console.log(data.key);
                    console.log(amount);
                    // console.log("found");
                    // console.log(data.values[0].UN_population);
                    // console.log(data.values[0].UN_population+1);
                    // console.log(data.values[0].UN_population);
                    // console.log(color(data.values[0].UN_population));
                    // // return color(data.values[0].UN_population);
                    // console.log("getting here");
                }
            });
            if (amount > 0){
                return color(amount);
            }
            else{
                return "#ccc"
            }

        })
        .attr("stroke", "darkgrey")
        .attr("stroke-width", "0.5px")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var legendRectSize = 18;
    var legendSpacing = 4;

    svg1.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");

    console.log(color.domain()[0]);

    var q1 = color.domain()[0];
    var q2 = q1 + (color.domain()[1]-color.domain()[0])/5;
    var q3 = q2 + (color.domain()[1]-color.domain()[0])/5;
    var q4 = q3 + (color.domain()[1]-color.domain()[0])/4;
    var q5 = q4 + (color.domain()[1]-color.domain()[0])/5;

    console.log(q1, q2, q3, q4, q5);
    legend = svg1.selectAll('.legend')
        .data([q1, q2, q3, q4 ,q5])
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * color.domain().length /2 ;
            var horz = 2 * legendRectSize+130;
            var vert = i* height - offset + 400;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function(d){
            console.log(d);
            console.log(color(d));
            return color(d)
        })
        .style('stroke', color);

    legend.append('text')
        .attr('class', "extra-text")
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing-10)
        .text(function(d) { return Math.round(d); });

    svg1.append('text')
        .attr('class', "extra-text")
        .attr('x', 189)
        .attr('y', 490)
        .text(Math.round(color.domain()[1]));

    };

d3.select('#select-key').on('change', function(a) {
    // Change the current key and call the function to update the colors.
    var newcheck = d3.select(this).property('value');
    // console.log(newcheck);
    changeAttribute(newcheck, africa);
    changeLegend(newcheck, data);
});


function changeAttribute(attribute, mapData){
    var dict2 = {};
    //change the expressed attribute
    //recolor the map
    // console.log(countriesByCode);
    console.log(mapData);
    console.log(attribute);
    console.log(d3.min(data, function(d) {
        return d[attribute];
    }));
    color.domain([d3.min(data, function(d) {
        return d[attribute];
    }),
        d3.max(data, function(d) {
            return d[attribute];
        })]);
    console.log(color.domain);
    svg1.selectAll("path") //select every region
        .data(mapData)
        .attr("fill", function (d) {
            var amount = 0;
            var value = d.properties.adm0_a3;
            console.log(value);
            countriesByCode.forEach(function(data){
                if (value == data.key && (!(value in dict2))) {
                    dict2[value] = 1;
                    amount = data.values[0][attribute];
                    console.log(data.key);
                    console.log(amount);
                    // console.log("found");
                    // console.log(data.values[0].UN_population);
                    // console.log(data.values[0].UN_population+1);
                    // console.log(data.values[0].UN_population);
                    // console.log(color(data.values[0].UN_population));
                    // // return color(data.values[0].UN_population);
                    // console.log("getting here");
                    console.log(color(amount));
                }
            });
            if (amount > 0){
                return color(amount);
            }
            else{
                return "#ccc"
            }

        })
};

function changeLegend(attribute, csvData){
    color.domain([d3.min(csvData, function(d) {
        return d[attribute];
    }),
        d3.max(csvData, function(d) {
            return d[attribute];
        })]);
    var legendRectSize = 18;
    var legendSpacing = 4;

    svg1.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");

    console.log(color.domain());
    var q1 = color.domain()[0];
    var q2 = q1 + (color.domain()[1]-color.domain()[0])/5;
    var q3 = q2 + (color.domain()[1]-color.domain()[0])/5;
    var q4 = q3 + (color.domain()[1]-color.domain()[0])/5;
    var q5 = q4 + (color.domain()[1]-color.domain()[0])/5;

    svg1.selectAll('.legend')
        .data([q1, q2, q3, q4 ,q5])
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * color.domain().length /2 ;
            var horz = 2 * legendRectSize;
            var vert = i* height - offset + 50;
            return 'translate(' + horz + ',' + vert + ')';
        });

    svg1.selectAll("text").remove();

    legend.append("text")
        .attr("class", "extra-text")
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing-10)
        .text(function(d) { return d; });

    svg1.append('text')
        .attr('class', "extra-text")
        .attr('x', 189)
        .attr('y', 490)
        .text(Math.round(color.domain()[1]));

};