# Colour Clock Experiments

This folder contains browser-based experiments that map time and calendar values to colors. The main page displays the current time as a live color clock, while the square variant presents the same concept with an alternate stylesheet and markup arrangement.

## Contents

- [colour.html](colour.html) - main color clock page using the newer jQuery file from the parent `resources` folder.
- [square.html](square.html) - alternate color clock page using the local `jquery-1.11.1.min.js` file and `square.css`.
- [colour.js](colour.js) - updates the clock every 250 milliseconds and renders time, RGB, hexadecimal, and hue values.
- [convert.js](convert.js) - color conversion helpers for RGB, HSV, hexadecimal, and hue calculations.
- [util.js](util.js) - date and numeric helpers, including day-of-year and time padding functions.
- [colour.css](colour.css) - styles for the main color clock.
- [square.css](square.css) - alternate styles for the square clock layout.
- [static_calendar.html](static_calendar.html) - an older static calendar experiment with month, day, and hour color blocks.
- [colour_samples.xlsx](colour_samples.xlsx) - sample data associated with the color experiments.

## Running the Clock

Open either [colour.html](colour.html) or [square.html](square.html) in a browser (double-click, or `file://...`). No build step is required.

The pages use relative script paths, so the folder should be opened from its existing workspace location or served as part of the surrounding project. If a browser blocks local scripts or the parent `resources` path is unavailable, serve the workspace over HTTP with a simple local server, for example:

```text
cd c:\_src\_learn\Sandbox
python -m http.server 8000
```

Then open `http://localhost:8000/colour/colour.html` or `http://localhost:8000/colour/square.html`.

## Clock Behavior

The clock continuously updates:

- The hour, minute, and second are shown as time values.
- Each time unit is mapped to an RGB component and displayed as an RGB color.
- Each component is also displayed as a hexadecimal value.
- Each time unit is mapped to a hue around the color wheel.
- The page background is based on the current day of the year.
- The page title is updated with the current time and generated color values.

The `Traditional` mode maps the day of year directly around the hue cycle. The `Adapted` mode mirrors the day value around an offset so the annual color progression follows the alternative mapping implemented in `colour.js`.

## Script Loading Order

The clock pages load scripts in this order:

1. jQuery
2. `util.js`
3. `convert.js`
4. `colour.js`

The order matters because `colour.js` calls helper functions defined in the earlier files.

## Notes

This is a learning and experimentation project rather than a packaged application. The scripts use separate IIFE modules: `ColourUtils` exposes shared date and numeric helpers, `ColourConvert` exposes the conversions used by the clock, and `ColourClock` exposes only `startTime()` while keeping its rendering helpers private. The two clock pages intentionally preserve their older HTML/CSS structure for comparison.
