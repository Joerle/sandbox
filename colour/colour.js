function dispTime(dayOfYear, hr, min, sec) {
    hr = padTime10(hr);
    min = padTime10(min);
    sec = padTime10(sec);

    $("#hr div.time").text(hr);
    $("#min div.time").text(min);
    $("#sec div.time").text(sec);
    $("title").text(hr + ":" + min + ":" + sec);

    $("#dayOfYear").text("day " + dayOfYear);
}

function dispHex(rgb) {
    var hex = {
            r: parseHex(rgb.r),
            g: parseHex(rgb.g),
            b: parseHex(rgb.b)
        },
        hexText = rgbToHex(rgb),
        title = $("title").text() + " " + hexText;

    $( "#hr div.hex").css("background-color", "#" + hex.r + "0000").text(hex.r);
    $("#min div.hex").css("background-color", "#00" + hex.g + "00").text(hex.g);
    $("#sec div.hex").css("background-color", "#0000" + hex.b).text(hex.b);

    $("title").text(title);
}

function dispRGB(hr, min, sec) {
    var rgb = {
            r: get255fr24(hr),
            g: get255fr60(min),
            b: get255fr60(sec)
        },
        title = $("title").text()
        rgbText = "";

    $( "#hr div.rgb").css("background-color", "rgb(" + rgb.r + ", 0, 0)").text(padTime100(rgb.r));
    $("#min div.rgb").css("background-color", "rgb(0, " + rgb.g + ", 0)").text(padTime100(rgb.g));
    $("#sec div.rgb").css("background-color", "rgb(0, 0, " + rgb.b + ")").text(padTime100(rgb.b));

    rgbText = "rgb("+ rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    $("#clock").css("background-color", rgbText);
    $("title").text(title + " " + rgbText);

    dispHex(rgb);
}

function dispHSB(doy, hr, min, sec) {
    //convert the time value to a hue, based on percentage through greater time unit (ex: minutes of hour)
    var hr360 = get360fr24(hr),
        min360 = get360fr60(min),
        sec360 = get360fr60(sec);

    var mode = $("[name='mode']:checked").val();
    if (mode == "adpt") {
        var offset = 152;
        doy = doy >= offset ? 365 - (doy - offset) : offset - doy;
    }
    var day360 = get360fr365(doy);

    //convert the hue to an RGB colour with max saturation and value
    var hrHsv = maxSvToRgb(hr360),
        minHsv = maxSvToRgb(min360),
        secHsv = maxSvToRgb(sec360),
        dayHsv = maxSvToRgb(day360);

    var hrRgb = "rgb(" + hrHsv.r.toFixed(0) + ", " + hrHsv.g.toFixed(0) + ", " + hrHsv.b.toFixed(0) + ")",
        minRgb = "rgb(" + minHsv.r.toFixed(0) + ", " + minHsv.g.toFixed(0) + ", " + minHsv.b.toFixed(0) + ")",
        secRgb = "rgb(" + secHsv.r.toFixed(0) + ", " + secHsv.g.toFixed(0) + ", " + secHsv.b.toFixed(0) + ")",
        dayRgb = "rgb(" + dayHsv.r.toFixed(0) + ", " + dayHsv.g.toFixed(0) + ", " + dayHsv.b.toFixed(0) + ")";

    $( "#hr div.hue").text(hr360.toFixed(0)).css("background-color", hrRgb);
    $("#min div.hue").text(min360.toFixed(0)).css("background-color", minRgb);
    $("#sec div.hue").text(sec360.toFixed(0)).css("background-color", secRgb);

    $("#one div.hue").css("background", "linear-gradient(to right, " + hrRgb + " , " + minRgb + ")");
    $("#two div.hue").css("background", "linear-gradient(to right, " + minRgb + ", " + secRgb + ")");

    $("body").css("background-color", dayRgb);
}

/*
  background: -webkit-linear-gradient(left, red , blue); //For Safari 5.1 to 6.0
  background: -o-linear-gradient(right, red, blue); //For Opera 11.1 to 12.0
  background: -moz-linear-gradient(right, red, blue); //For Firefox 3.6 to 15
  background: linear-gradient(to right, red , blue); //Standard syntax

*/
function startTime() {
    var now = new Date(),
        hr = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        mill = now.getMilliseconds(),
        day = 0;
        doy = now.getDOY();

    dispTime(doy, hr, min, sec);

    sec = sec + mill / 1000;
    min = min  + sec / 60;
    hr = hr + min / 60;
    day = hr / 24;

    dispRGB(hr, min, sec);
    dispHSB(doy, hr, min, sec);

    var timeOut = setTimeout(function () { startTime() }, 250);
}

$(document).ready(function () {
    startTime();
});