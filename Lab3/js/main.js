// var sandwiches = [
//     { name: "Thesis", price: 7.95, size: "large" },
//     { name: "Dissertation", price: 8.95, size: "large" },
//     { name: "Highlander", price: 6.50, size: "small" },
//     { name: "Just Tuna", price: 6.50, size: "small" },
//     { name: "So-La", price: 7.95, size: "large" },
//     { name: "Special", price: 12.50, size: "small" }
// ];
//
// // Add svg element (drawing space)
// var svg = d3.select("body").append("svg")
//     .attr("width", 1000)
//     .attr("height", 500);
//
// // Add rectangle
// svg.selectAll("circle")
//     .data(sandwiches)
//     .enter()
//     .append("circle")
//     .attr("fill", function(d){
//         if(d.price<7.00)
//         {
//             return "yellow";
//         }
//         else
//         {
//             return "blue";
//         }
//     })
//     .attr("stroke", "red")
//     .attr("r", function(d){
//         if(d.size==="large")
//         {
//             return (20);
//         }
//         else
//         {
//             return 10;
//         }
//     })
//     .attr("cy", 50)
//     .attr("cx", function(d, index) {
//         return ((index+1) * 60);
//     });

var counter = 0;
d3.csv("data/cities.csv", function(data) {
    var eu_cities = data.filter(function(value) {
        return value.eu === "true";
    });
    counter = eu_cities.length;
    console.log(counter);
    console.log(eu_cities);
    d3.select("body").append("p").text("There are " + counter + " cities.");
    eu_cities.forEach(function(element){
        element.population = +element.population;
        element.x = +element.x;
        element.y = +element.y;
    });
    var svg2 = d3.select("body").append("svg")
        .attr("width", 700)
        .attr("height", 550);

    svg2.selectAll("circle")
        .data(eu_cities)
        .enter()
        .append("circle")
        .attr("fill", "blue")
        .attr("stroke", "red")
        .attr("r", function(d){
            if(d.population<1000000)
            {
                return 4;
            }
            else
            {
                return 8;
            }
        })
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        });
    svg2.selectAll("text")
        .data(eu_cities)
        .enter()
        .append("text")
        .attr("dy", function(d){
            return (d.y + 20);
        })
        .attr("dx", function(d){
            return (d.x-20);
        })
        .text(function(d){
            return d.city;
        })
        .attr("opacity", function(d){
            if(d.population>=1000000)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        });
    d3.selectAll("circle")
        .on("click", function () {
            d3.select(this)
                .each(function (d) {
                    console.log(d.population);
                });

        });

});




