/* main JS file */

console.log("Hello JS world!");

// function csvToArray (csv) {
//     rows = csv.split("\n");
//
//     return rows.map(function (row) {
//         return row.split(",");
//     });
// };
//
// var marriages;
// var biz;
//
// d3.csv("data/matrix1.csv", function(error, csv) {
//
//     marriages = csvToArray(csv);
//     console.log(marriages);
// });

// var marriages = [
//     [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],
//     [0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0],
//     [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
//     [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
//     [1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
//     [0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
//     [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
//     [0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,0],
//     [0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0]
// ];
//
// var biz = [
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,1,1,0,0,1,0,1,0,0,0,0,0],
//     [0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0],
//     [0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0],
//     [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
//     [0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,0],
//     [0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,1],
//     [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
// ];
//
// d3.csv("data/florentine-familiy-attributes.csv", function(data){
//     myMatrix = new Matrix("#chart", data, marriages, biz)
// });
//
// /*
//  * BarChart - Object constructor function
//  * @param _parentElement 	-- the HTML element in which to draw the bar charts
//  * @param _data						-- the dataset 'household characteristics'
//  * @param _config					-- variable from the dataset (e.g. 'electricity') and title for each bar chart
//  */
//
// Matrix = function(_parentElement, _data, _data1, _data2){
//     this.parentElement = _parentElement;
//     this.data = _data;
//     this.data1 = _data1;
//     this.data2 = _data2;
//     this.displayData = _data;
//     this.displayData1 = _data1;
//     this.displayData2 = _data2;
//
//
//
//     console.log("done");
//
//     this.initVis();
// };
//
//
//
// // function initVis(){
// //     var margin = {top: 40, right: 10, bottom: 60, left: 60};
// //
// //     var width = 960 - margin.left - margin.right,
// //         height = 500 - margin.top - margin.bottom;
// //
// //     var svg = d3.select("#chart-area").append("svg")
// //         .attr("width", width + margin.left + margin.right)
// //         .attr("height", height + margin.top + margin.bottom)
// //         .append("g")
// //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// //
// //     wrangleData();
// // }
// //
// // function updateVis(){
// //
// }

// *********************************************


var business = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,0],
    [0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]];
var marriages = [[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],
    [0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,0],
    [0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0]];


d3.csv("data/florentine-familiy-attributes.csv", function(data) {
    // console.log(data);
    myMatrix = new Matrix("chart", data, marriages, business);


});
// and they asked us to put the rest in a connected file so this is the other js file