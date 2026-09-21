# Workspace Copilot Instructions

Use these instructions when working in this workspace.

## Project Context

- The root `Sandbox/` directory contains projects for experimentation, organized into separate directories based on their functionality and purpose.
- The following are project directories:
  - `drag-and-drop/` is a single html page which takes in JSON-formatted data, and allows users to move them between columns and sections based on pre-defined rules.
  - `colour/` is a set of tools to convert RGB, HEX, and HSL color formats between each other, as well as map them to dateTime values.
  - `map/` is a simple html page that uses CSS and JavaScript to display a topographical map of downtown Vancouver overtop a Google Map of the same area. Implements a slider to adjust the transparency of the topographical map.
  - `battle/` is a simple html D&D battle simulator
  - `LiveWallpaper/` is an Android live wallpaper project, not yet working
  - `andenginelivewallpaperextensionexample/` is unused and not working, demo app downloaded from somewhere some time ago
- `resources/` is not a project directory, but rather a place to store shared assets and resources used by the other projects.


## Coding Preferences

- Prefer small, focused changes.
- Preserve existing behavior unless a change is explicitly requested.
- Follow the conventions already present in the surrounding code.
- Use meaningful names and keep public APIs stable.
- Avoid unrelated refactoring.

## Documentation Preferences

- Keep documentation concise and factual.
- Use relative links for files within the workspace.
- Update documentation when a change affects setup or behavior.

## Editing Rules

- Inspect the current file before editing it.
- Preserve user changes and work with a dirty working tree.
- Do not commit changes or create branches unless explicitly requested.
- Do not add comments unless they explain non-obvious behavior.
- after editing a file, wait for confirmation of those edits before attempting to run any kind of test (especially a terminal command)
  - always ask if a test of any kind is required for your edit

## Testing and Validation

- Run the narrowest relevant validation after each change.
- Run syntax, lint, build, or test commands when available.
- Report commands that could not be run and why.
- For testing HTML, CSS, and JavaScript functionality, allow running a test or check if it doesn't involve launching a browser. Assume the user wishes to test manually, but provide the option for automated testing when feasible.

## Additional Preferences

- Check with user before removing comments and commented code—it may contain helpful information or context, or be intended for future use.

### JavaScript

- Use ES6+ syntax where possible.
- Always use `const` and `let` over `var`
  - Always use `const` by default and only use `let` when reassignment is necessary
  - Use a single `const` or `let` declaration for all related variables in the same scope.
  - Do not split a logically related group across multiple declarations unless they are intentionally independent.
  - Prefer grouped declarations over multiple declarations:
    - Unassigned: `let r, g, b;`
      - Keep on one line when short; wrap only when needed for readability.
    - Assigned together:
      ```js
      const id = String(month).padStart(2, "0"),
          color = getComputedStyle(document.querySelector(`#m${id}`)).backgroundColor,
          channels = color.match(/\d+/g).map(Number);
      ```
      - This must remain a single grouped declaration, not separate `const` statements.
  - A declaration is invalid for this rule if it creates multiple unrelated `const` or `let` statements for values that belong together.
- Use arrow functions for anonymous functions.
- Keep functions small and focused.
- Use meaningful variable and function names.
- Avoid global variables.
- Always follow existing code style and conventions.
  - it is acceptable to add `$(function () { ... });` to wrap top-level JavaScript code when using jQuery.
- Prefer template literals over string concatenation.
- Use destructuring for objects and arrays when appropriate.
- Avoid using `eval()` and other potentially unsafe functions.
- Never remove unused variables or functions without confirmation, flag them instead.
- Always update indentation to match nested block structures and maintain readability
  - top-level javascript should always be un-indented, even when inside a `<script>` tag.

### CSS
- Use consistent naming conventions for classes and IDs.
- Prefer flexbox or grid for layout over floats.
- Avoid using `!important` unless absolutely necessary.
- Always follow existing code style and conventions, including nested rules.
- Always update indenting to match nested rules and maintain readability

### HTML
- Always update indentation to match nested elements and maintain readability
  - If a tag spans multiple lines, ensure proper indentation for each line.
  - If a tag has little content (e.g., `<span>text</span>`, `<td>content</td>`), keep it on a single line.
  - `<body>`, `<head>`, `<script>`, and `<style>` act as top-level containers and should not be indented.
  - `<br/>` should go at the end of a line (not the beginning), followed by a newline.
  - Content within block tags should start on a new line after the tag and be properly indented.
    - Exceptions, if the content is very short and fits comfortably on a single line, for these tags only: `<p>`, `<td>`, `<li>`.
- Always maintain consistent use of either single or double quotes for attribute values throughout the document.
- Avoid inline styles unless absolutely necessary.
- Use semantic HTML elements whenever possible to improve accessibility and maintainability.
- Ensure that interactive elements (e.g., buttons, links) are keyboard accessible.