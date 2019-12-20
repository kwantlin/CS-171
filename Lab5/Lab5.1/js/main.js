
// The function is called every time when an order comes in or an order gets processed
// The current order queue is stored in the variable 'orders'
//Append a new SVG area

var svg = d3.select("body").append("svg")
	.attr("width", 700)
	.attr("height", 300);

var ordertext =  svg.append("text")
	.attr("x", 10)
	.attr("y", 85);

function updateVisualization(orders) {
	console.log(orders);
	var circle = svg.selectAll("circle")
		.data(orders);

	// Enter (initialize the newly added elements)
	circle.enter().append("circle")
		.attr("class", "dot")
		.attr("fill", "#707086")

		// Enter and Update (set the dynamic properties of the elements)
		.merge(circle)
		.attr("r", 20)
		.attr("fill", function(d, index) {
			if(d.product == "coffee")
			{
				return "tan"
			}
			else{
				return "green"
			}
		})
		.attr("cx", function(d, index) { return (index * 50) + 100 })
		.attr("cy", 80);

	// Exit
	circle.exit().remove();

	ordertext.text("Orders: " + orders.length);

}