d3.csv("data/buildings.csv", function(data) {
    console.log(data.length);
    //sort buildings by descending height
    for (var i = 0; i < data.length; i++) {
        var max = 0;
        var maxIndex = 0;
        var switcher;
        for (var j = i; j < data.length; j++) {
            if (data[j].height_px > max) {
                max = data[j].height_px;
                maxIndex = j;

            }

        }
        if (max != 500) {
            switcher = data[i];
            data[i] = data[maxIndex];
            data[maxIndex] = switcher;
        }
    }
    console.log(data);
    //Set up bar chart
    var svg = d3.select(".column1").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "green")
        .attr("width", function (d) {
            return d.height_px;
        })
        .attr("height", 30)
        .attr("x", 220)
        .attr("y", function (d, index) {
            return (index * 40);
        });
    //Include text labels
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "alignment")
        .attr("x", 220)
        .attr("y", function (d, index) {
            return ((index + 0.5) * 40);
        })
        .text(function (d) {
            return d.building;
        });
    //Enable info to be displayed upon clicking bars or text
    d3.selectAll("text,rect")
        .on("click", function () {
            d3.select(this)
                .each(function (d) {
                    console.log(d.country);
                    document.getElementById("name").innerHTML = d.building;
                    document.getElementById("height").innerHTML = "Height: " +d.height_m + " meters";
                    document.getElementById("city").innerHTML = "City: " + d.city;
                    document.getElementById("country").innerHTML = "Country: " + d.country;
                    document.getElementById("floors").innerHTML = "Floors: " + d.floors;
                    document.getElementById("completed").innerHTML = "Completed in: " + d.completed;
                    document.getElementById("image").innerHTML = "<img src=" + "img/" + d.image + ">";
                    document.getElementById("linked").innerHTML = "<a href=" + d.wiki + " target=\"_blank\">More Info</a>";
                });
       });

    
});

