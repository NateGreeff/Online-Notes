//Generate Numeric User ID randomly
function uuid() {
    var id = "";
    var numbers = "0123456789";
    for (var i = 0; i < 6; i++) {
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return id;
}

//Export
module.exports = uuid;