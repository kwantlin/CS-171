var width = 1000,
    height = 600;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);


var projection = d3.geoMercator()
    .translate([width/2, height/2])
    .scale([140]);

//
// var projection = d3.geoOrthographic()
//     .translate([width/2, height/2])
//     .scale([100]);


var path = d3.geoPath()
    .projection(projection);

queue()
    .defer(d3.json, "data/world-110m.json")
    .defer(d3.json, "data/airports.json")
    .await(createVisualization);

function createVisualization(error, data1, data2) {

    var world = topojson.feature(data1, data1.objects.countries).features;

    // Render the world by using the path generator
    svg.selectAll("path")
        .data(world)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "map");

    // Render airports

    // var force = d3.forceSimulation(data2.nodes)
    //     .force("charge", d3.forceManyBody().strength(1))
    //     .force("link", d3.forceLink(data2.links));

    var node = svg.selectAll(".node")
        .data(data2.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .attr("fill", function(d) {
            if (d.country === "United States") {
                return "blue"
            }
            else {
                return "red"
            }
        })
        .attr("transform", function(d) {
            return "translate(" + projection([d.longitude, d.latitude]) + ")";
        });

    // console.log(data2.nodes.length);
    // console.log(data2.nodes[2].latitude);
    data2.links.forEach(function(element) {
        if(element.target !== 0){
            console.log(data2.nodes[element.target-1].latitude);
        }
    });
    // console.log(data2.nodes[data2.links[3].source-1].latitude);

    svg.selectAll("line")
        .data(data2.links)
        .enter()
        .append("line")
        .attr("class", "lines")
        .attr("x1", function(d) {
            return projection([data2.nodes[d.source].longitude,data2.nodes[d.source].latitude])[0];
        })
        .attr("y1", function(d) {
        return projection([data2.nodes[d.source].longitude,data2.nodes[d.source].latitude])[1];
        })
        .attr("x2", function(d) {
                return projection([data2.nodes[d.target].longitude,data2.nodes[d.target].latitude])[0];
        })
        .attr("y2", function(d) {
                return projection([data2.nodes[d.target].longitude,data2.nodes[d.target].latitude])[1];
        })
        .style("stroke", "#ccc")
        .style("stroke-width", 1);

    console.log(projection([data2.nodes[2].latitude,data2.nodes[2].longitude])[0]);
    console.log(projection([data2.nodes[data2.links[12].source-1].longitude,data2.nodes[data2.links[12].source-1].latitude])[0]);

    // svg.selectAll("line")
    //     .data(data2.links)
    //     .enter()
    //     .append("line")
    //     .attr("x1", projection([data2.nodes[0].longitude,data2.nodes[0].latitude])[0])
    //     .attr("y1", projection([data2.nodes[0].longitude,data2.nodes[0].latitude])[1])
    //     .attr("x2", projection([data2.nodes[4].longitude,data2.nodes[4].latitude])[0])
    //     .attr("y2", projection([data2.nodes[4].longitude,data2.nodes[4].latitude])[1])
    //     .style("stroke", "#ccc")
    //     .style("stroke-width", 1)
    //     ;

    // svg.selectAll("line")
    //     .data(data2)
    //     .enter()
    //     .append("line")
    //     .attr("x1", function(d) {
    //         for (let i=0; i<d.links.length; i++){
    //             if(d.links.source == d.nodes.id) {
    //                 console.log(d.nodes.latitude);
    //                 return data2.nodes.latitude;
    //             }
    //         }
    //     })
    //     .attr("y1", function(d) {
    //         for (let i=0; i<d.links.length; i++){
    //             if(d.links.source == d.nodes.id) {
    //                 return data2.nodes.longitude;
    //             }
    //         }
    //     })
    //     .attr("x2", function(d) {
    //         for (let i=0; i<d.links.length; i++){
    //             if(d.links.target == d.nodes.id) {
    //                 return data2.nodes.latitude;
    //             }
    //         }
    //     })
    //     .attr("y2", function(d) {
    //         for (let i=0; i<d.links.length; i++){
    //             if(d.links.target == d.nodes.id) {
    //                 return data2.nodes.longitude;
    //             }
    //         }
    //     })
    //     .style("stroke", "#ccc")
    //     .style("stroke-width", 1000000);


    // svg.selectAll(".line")
    //     .data(data2.links)
    //     .enter().append('line')
    //     .style("stroke", "#ccc")
    //     .style('stroke-width', 2000)

    // var edge = svg.selectAll("line")
    //     .data(data2.links)
    //     .enter()
    //     .append("line")
    //     .style("stroke", "#ccc")
    //     .style("stroke-width", 1);

    // force.on("tick", function() {
    //
    //     edge.attr("x1", function(d) { return d.source.x; })
    //         .attr("y1", function(d) { return d.source.y; })
    //         .attr("x2", function(d) { return d.target.x; })
    //         .attr("y2", function(d) { return d.target.y; });
    //
    //     node.attr("cx", function(d) { return d.x; })
    //         .attr("cy", function(d) { return d.y; });
    //
    // });

    // var airports = topojson.feature(data2, data2.objects.country).features;
    node.append("title")
        .text(function(d) { return d.name; });

}

// d3.json("data/world-110m.json", function(error, data) {
//
//     // Convert TopoJSON to GeoJSON (target object = 'states')
//     var world = topojson.feature(data, data.objects.countries).features;
//
//     // Render the world by using the path generator
//     svg.selectAll("path")
//         .data(world)
//         .enter().append("path")
//         .attr("d", path)
//         .attr("class", "map");
//
//     // svg.append("path")
//     //     .datum(topojson.mesh(data, data.objects.countries))
//     //     .attr("d", path);
// });