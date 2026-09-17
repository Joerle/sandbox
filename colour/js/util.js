const ColourUtils = (function () {
    const millisecondsPerDay = 86_400_000;

    return {
        getDayOfYear(now) {
            const year = now.getFullYear();
            return Math.floor((Date.UTC(year, now.getMonth(), now.getDate()) - Date.UTC(year, 0, 0)) / millisecondsPerDay);
        },
        padTime10(num) {
            return String(num).padStart(2, "0");
        },
        padTime100(num) {
            return String(num).padStart(3, "0");
        },
        get255fr60(num) {
            return (num * 255 / 60).toFixed(0);
        },
        get255fr24(num) {
            return (num * 255 / 24).toFixed(0);
        },
        parseHex(num) {
            return Number.parseInt(num, 10).toString(16).toUpperCase().padStart(2, "0");
        },
        get360fr60(num) {
            return num * 6;
        },
        get360fr24(num) {
            return num * 15;
        },
        get360fr365(num) {
            return num * (360 / 365);
        }
    };
})();