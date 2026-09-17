const ColourConverter = (function () {
    const { parseHex } = ColourUtils;

    return {
        rgbToHex(r, g, b) {
            if (arguments.length < 3) {
                b = r.b;
                g = r.g;
                r = r.r;
            }
            return "#" + parseHex(r) + parseHex(g) + parseHex(b);
        },
        rgbToHsv(r, g, b) {
            if (typeof r === "object") {
                ({ r, g, b } = r);
            }
            r /= 255;
            g /= 255;
            b /= 255;
            const rgb = [ r, g, b ],
                max = Math.max(...rgb),
                min = Math.min(...rgb),
                diff = max - min;

            let h = 0;
            const s = max === 0 ? 0 : diff / max,
                v = max;

            if (max !== min) {
                switch (max) {
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
                h,
                s: s * 100,
                v: v * 100
            };
        },
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
        hsvToRgb(h, s, v) {
            if (arguments.length < 3) {
                v = h.v;
                s = h.s;
                h = h.h;
            }

            s = s > 1 ? s / 100 : s;    // normalize saturation
            v = v > 1 ? v / 100 : v;    // normalize value/brightness

            let r = 0,
                g = 0,
                b = 0;

            const h6 = h / 60,
                h6Int = Math.floor(h6),      // integer part of h6, representing the sector of the color wheel
                h6Fr = h6 - h6Int,           // fractional part of h6, representing the position within the sector of the color wheel
                h6FrInv = 1 - h6Fr,          // inverse of the fractional part, representing the complementary position within the sector of the color wheel
                sInvr = 1 - s,                          // the inverse of saturation (1 - saturation)
                h6Min = v * sInvr,                      // the minimum value in the current sector (brightness x saturation inverse)
                h6Decr = v * (1 - h6Fr * s),            // the decreasing value within the sector (brightness x (1 - (fractional part of hue)))
                h6Incr = v * (sInvr + h6Fr * s);    // the increasing value within the sector (brightness x (inverse saturation plus the fractional part of hue))

            switch (h6Int) {
                case 0:     //red -> yellow
                    r = v;
                    g = h6Incr;
                    b = h6Min;
                    break;
                case 1:     //yellow -> green
                    r = h6Decr;
                    g = v;
                    b = h6Min;
                    break;
                case 2:     //green -> cyan
                    r = h6Min;
                    g = v;
                    b = h6Incr;
                    break;
                case 3:     //cyan -> blue
                    r = h6Min;
                    g = h6Decr;
                    b = v;
                    break;
                case 4:     //blue -> magenta
                    r = h6Incr;
                    g = h6Min;
                    b = v;
                    break;
                case 5:     //magenta -> red
                    r = v;
                    g = h6Min;
                    b = h6Decr;
                    break;
            }

            return {
                r: r * 255,
                g: g * 255,
                b: b * 255
            };
        },
        hsvToRgb(h, s, v) {
            if (typeof h === "object") {
                ({ v, s, h } = h);
            }

            s = s > 1 ? s / 100 : s;    // normalize saturation
            v = v > 1 ? v / 100 : v;    // normalize value/brightness

            let r = 0,
                g = 0,
                b = 0;

            const h6 = h / 60,
                h6Int = Math.floor(h6),      // integer part of h6, representing the sector of the color wheel
                h6Fr = h6 - h6Int,           // fractional part of h6, representing the position within the sector of the color wheel
                h6FrInv = 1 - h6Fr,          // inverse of the fractional part, representing the complementary position within the sector of the color wheel
                sInvr = 1 - s,                          // the inverse of saturation (1 - saturation)
                h6Min = v * sInvr,                      // the minimum value in the current sector (brightness x saturation inverse)
                h6Decr = v * (1 - h6Fr * s),            // the decreasing value within the sector (brightness x (1 - (fractional part of hue)))
                h6Incr = v * (sInvr + h6Fr * s);    // the increasing value within the sector (brightness x (inverse saturation plus the fractional part of hue))

            switch (h6Int) {
                case 0:     //red -> yellow
                    r = v;
                    g = h6Incr;
                    b = h6Min;
                    break;
                case 1:     //yellow -> green
                    r = h6Decr;
                    g = v;
                    b = h6Min;
                    break;
                case 2:     //green -> cyan
                    r = h6Min;
                    g = v;
                    b = h6Incr;
                    break;
                case 3:     //cyan -> blue
                    r = h6Min;
                    g = h6Decr;
                    b = v;
                    break;
                case 4:     //blue -> magenta
                    r = h6Incr;
                    g = h6Min;
                    b = v;
                    break;
                case 5:     //magenta -> red
                    r = v;
                    g = h6Min;
                    b = h6Decr;
                    break;
            }

            return {
                r: r * 255,
                g: g * 255,
                b: b * 255
            };
        },
        maxSvToRgb(hue) {
            let r = 0,
                g = 0,
                b = 0;

            const h6 = hue / 60,            // divide hue by 60 to get the sector/a sixth of the color wheel
                h6Int = Math.floor(h6),     // integer part of h6, representing the sector of the color wheel
                h6Fr = h6 - h6Int,          // fractional part of h6, representing the position within the sector of the color wheel
                h6FrInv = 1 - h6Fr;        // inverse of the fractional part, representing the complementary position

            switch (h6Int) {
                case 0:     //red -> yellow
                    r = 1;
                    g = h6Fr;
                    b = 0;
                    break;
                case 1:     //yellow -> green
                    r = h6FrInv;
                    g = 1;
                    b = 0;
                    break;
                case 2:     //green -> cyan
                    r = 0;
                    g = 1;
                    b = h6Fr;
                    break;
                case 3:     //cyan -> blue
                    r = 0;
                    g = h6FrInv;
                    b = 1;
                    break;
                case 4:     //blue -> magenta
                    r = h6Fr;
                    g = 0;
                    b = 1;
                    break;
                case 5:     //magenta -> red
                    r = 1;
                    g = 0;
                    b = h6FrInv;
                    break;
            }
            return {
                r: r * 255,
                g: g * 255,
                b: b * 255
            };
        }
};
})();
