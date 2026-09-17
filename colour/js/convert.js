const ColourConvert = (function () {
    const { parseHex } = ColourUtils;

function rgbToHex(r, g, b) {
    if (arguments.length < 3) {
        b = r.b;
        g = r.g;
        r = r.r;
    }
    return "#" + parseHex(r) + parseHex(g) + parseHex(b);
}

function rgbToHsv(r, g, b) {
    if (arguments.length < 3) {
        b = r.b;
        g = r.g;
        r = r.r;
    }
    r = r / 255;
    g = g / 255;
    b = b / 255;

    const rgb = [ r, g, b ],
        max = Math.max(0.01, ...rgb),
        min = Math.min(...rgb),
        diff = max - min;

    let h = 1;
    const s = (max == 0 ? 0 : diff / max),
        v = max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch(max) {
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
                break;
        }

        h = Math.abs(h * 60);
    }

    return { 
        h: h,
        s: s * 100,
        v: v * 100
    };
}
    
/**
 * Converts an HSV color value to RGB. Conversion formula adapted from
 * http://en.wikipedia.org/wiki/HSV_color_space. Assumes h, s, and v are contained in the set
 * [0, 1] and returns r, g, and b in the set [0, 255].
 *
 * @param Number
 *            h The hue
 * @param Number
 *            s The saturation
 * @param Number
 *            v The value
 * @return Array The RGB representation
 */
function hsvToRgb(h, s, v) {
    if (arguments.length < 3) {
        v = h.v;
        s = h.s;
        h = h.h;
    }

    s = s > 1 ? s/100 : s;
    v = v > 1 ? v/100 : v;

    let r = 0,
        g = 0,
        b = 0;

    const h6 = h/60,
        i = Math.floor(h6),
        f = h6 - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s);

    switch (i) {
        case 0:     //red -> yellow
            r = v;
            g = t;
            b = p;
            break;
        case 1:     //yellow -> green
            r = q;
            g = v;
            b = p;
            break;
        case 2:     //green -> cyan
            r = p;
            g = v;
            b = t;
            break;
        case 3:     //cyan -> blue
            r = p;
            g = q;
            b = v;
            break;
        case 4:     //blue -> magenta
            r = t;
            g = p;
            b = v;
            break;
        case 5:     //magenta -> red
            r = v;
            g = p;
            b = q;
            break;
    }

    return {
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
    //return [ r * 255, g * 255, b * 255 ];
    //return fixBlack(h, r, g, b);
}

function maxSvToRgb(hue) {
    let r = 0,
        g = 0,
        b = 0;

    const h6 = hue/60,
        i = Math.floor(h6),
        f = h6 - i,
        q = (1 - f),
        t = (1 - q);

    switch (i) {
        case 0:     //red -> yellow
            r = 1;
            g = t;
            b = 0;
            break;
        case 1:     //yellow -> green
            r = q;
            g = 1;
            b = 0;
            break;
        case 2:     //green -> cyan
            r = 0;
            g = 1;
            b = t;
            break;
        case 3:     //cyan -> blue
            r = 0;
            g = q;
            b = 1;
            break;
        case 4:     //blue -> magenta
            r = t;
            g = 0;
            b = 1;
            break;
        case 5:     //magenta -> red
            r = 1;
            g = 0;
            b = q;
            break;
    }

    return {
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
}

    return {
        rgbToHex,
        maxSvToRgb
    };
})();
