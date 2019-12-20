
// Global variable with 60 attractions (JSON format)
// console.log(attractionData);


dataFiltering();

function dataFiltering() {
	var attractions = attractionData;
	attractions.sort((a, b) => b.Visitors - a.Visitors);
	attractions = attractions.filter(function(value, index) {
		return (index < 5);
	});
	renderBarChart(attractions)
}

function dataManipulation(){
	var attractions = attractionData;
	var selectBox = document.getElementById("attraction-category");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	if(selectedValue != "all") {
		attractions.sort((a, b) => b.Visitors - a.Visitors);
		attractions = attractions.filter(function (value, index) {
			return (value.Category == selectedValue);
		});
		attractions = attractions.filter(function (value, index) {
			return (index < 5);
		});
	}
	else{
		attractions.sort((a, b) => b.Visitors - a.Visitors);
		attractions = attractions.filter(function(value, index) {
			return (index < 5);
		});
	}
	renderBarChart(attractions)
}



