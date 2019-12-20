

// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {
    var data = deliveryData;
    var selectBox1 = document.getElementById("area");
    var selectedValue1 = selectBox1.options[selectBox1.selectedIndex].value;
    var selectBox2 = document.getElementById("area");
    var selectedValue2 = selectBox2.options[selectBox2.selectedIndex].value;

    // Filter by location
    if(selectedValue1 === "boston")
    {
        data = data.filter(value => value.area === "Boston");
    }
    else if(selectedValue1 === "cambridge")
    {
        data = data.filter(value => value.area === "Cambridge");
    }
    else if(selectedValue1 === "somerville")
    {
        data = data.filter(value => value.area === "Somerville");
    }
    // Filter by type
    if(selectedValue2 === "web")
    {
        data = data.filter(value => value.order_type === "web");
    }
    else if(selectedValue2 === "phone")
    {
        data = data.filter(value => value.order_type === "phone");
    }
    var filtered = [];
    data.forEach(function (element1, index1) {
        feedbackData.forEach(function (element2, index2){
            if(element1.delivery_id === element2.delivery_id){
                filtered.push(element1);
            }
        });
    });

    //Make visualization
    var numPizzas = 0;
    var totaldelTime = 0;
    var avgTime = 0;
    var sales = 0;
    var entrieslow = 0;
    var entriesmed = 0;
    var entrieshigh = 0;
    filtered.forEach(function (element) {
        numPizzas += element.count;
    });
    filtered.forEach(function (element) {
        totaldelTime += element.delivery_time;
    });
    avgTime = totaldelTime/filtered.length;
    filtered.forEach(function (element) {
        sales += element.price;
    });
    filtered.forEach(function (element) {
        if (element.quality == "low") {
            entrieslow++;
        }
    });
    filtered.forEach(function (element) {
        if (element.quality == "medium") {
            entriesmed++;
        }
    });
    feedbackData.forEach(function (element) {
        if (element.quality == "high") {
            entrieshigh++;
        }
    });
    // var elem = document.getElementById("#chart-area");

    $("#chart-area").append("<br> Number of pizza deliveries: " + filtered.length + "<br>" + "Number of all delivered pizzas: " + numPizzas + "<br>" + "Average Delivery Time: " + avgTime + "<br>" + "Total Sales in USD: " + sales + "<br>"+ "Number of All Feedback Entries: " + feedbackData.length + "<br>"+ "Number of feedback entries per quality category: " + entrieslow + " low, " + entriesmed + " medium, " + entrieshigh + " high");

    renderBarChart(filtered)
}

function filterLocation(){
    var data = deliveryData;
    var selectBox = document.getElementById("area");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue === "boston")
    {
        data = data.filter(value => value.area === "Boston");
    }
    else if(selectedValue === "cambridge")
    {
        data = data.filter(value => value.area === "Cambridge");
    }
    else if(selectedValue === "somerville")
    {
        data = data.filter(value => value.area === "Somerville");
    }
    renderBarChart(data);
    createVisualization();
}

function filterType(){
    var data = deliveryData;
    var selectBox = document.getElementById("order-type");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue === "web")
    {
        data = data.filter(value => value.order_type === "web");
    }
    else if(selectedValue === "phone")
    {
        data = data.filter(value => value.order_type === "phone");
    }
    renderBarChart(data);
    createVisualization();
}

