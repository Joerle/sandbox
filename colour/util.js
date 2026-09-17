Date.prototype.getDOY = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - onejan) / 86400000);
}

function padTime10(num) {
    if (num < 10) {
        num = "0" + num
    };
    return num;
}

function padTime100(num) {
    if (num < 10 && num > 0) {
        num = "00" + num
    } else if (num < 100) {
        num = "0" + num;
    }
    return num;
}

function get255fr60(num) {
    return (num * 255/60).toFixed(0);
}

function get255fr24(num) {
    return (num * 255/24).toFixed(0);
}

function parseHex(num) {
    var hex = parseInt(num).toString(16).toUpperCase();
    return num < 16 ? "0" + hex : hex;
}

function get360fr60(num) {
    return num * 6;
}

function get360fr24(num) {
    return num * 15;
}

function get360fr365(num) {
    return num * (360/365);
}

function getDayOfYear(now) {
var start = new Date(now.getFullYear(), 0, 0),
        diff = now - start,
        oneDay = 1000 * 60 * 60 * 24,
        dayOfYear = Math.round(diff / oneDay);
    
    return dayOfYear;
}