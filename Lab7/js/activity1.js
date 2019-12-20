
var width = 400,
    height = 400;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

// 1) INITIALIZE FORCE-LAYOUT



// Load data
d3.json("data/airports.json", function(data) {

    var force = d3.forceSimulation(data.nodes)
        .force("charge", d3.forceManyBody().strength(0.1))
        .force("link", d3.forceLink(data.links).distance(10))
        .force("center", d3.forceCenter().x(width/2).y(height/2));



    console.log(data);
  // 2a) DEFINE 'NODES' AND 'EDGES'
    var node = svg.selectAll(".node")
        .data(data.nodes)
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
        });

    var edge = svg.selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);

    force.on("tick", function() {

        edge.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

    });

    // force.linkDistance(function(link) {
    //     return link.graph === 0 ? height/2 : height/4;
    // });

    node.call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragging)
        .on("end", dragEnded));

    node.append("title")
        .text(function(d) { return d.name; });

    function dragStarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragging(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragEnded(d) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }


  // 2b) START RUNNING THE SIMULATION

  // 3) DRAW THE LINKS (SVG LINE)

  // 4) DRAW THE NODES (SVG CIRCLE)

  // 5) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS

});


