var dells = [
    {id: "H",
    name: "Hades",
    price: 6,
    open: ["Monday", "Wednesday", "Friday"],
    limit: true
    },
    {id: "Z",
    name: "Zeus",
    price: 5,
    open: ["Tuesday", "Thursday"],
    limit: true
    },
    {id: "P",
    name: "Pegasus",
    price: 2,
    open: ["Saturday", "Sunday"],
    limit: false
    }
];

var listopendays = function(opendays){
    var list = "";
    for (var i = 0; i < opendays.length - 1; i++) {
        list = list + opendays[i] + ", ";
    }
    lastopen = opendays[opendays.length-1];
    list +=  lastopen;
    return list;
    }


console.log("The first attraction is "+ dells[0].name + ".");
var secondopen = listopendays(dells[1].open);
console.log("The second attraction is open " + secondopen + ".");
console.log("The second attraction is first open on " + dells[1].open[0] + ".");
console.log("After 50% discount, the third attraction's price is $" + (dells[2].price)/2 + ".");

// Calling the function
var amusementRidesDouble = doublePrices(dells);

// Implementation of the function
function doublePrices(amusementRides) {
    amusementRides.forEach(function (element, index) {
        if (index != 1) {
            element.price *= 2;
        }
    });
    return amusementRides;
}

console.log(amusementRidesDouble);


function debugAmusementRides(attractions){
    attractions.forEach(function (element){
        var px = element.price;
        console.log(element.name + " " + px);
    });
}
debugAmusementRides(dells);