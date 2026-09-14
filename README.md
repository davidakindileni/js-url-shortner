# Overview

I developed this URL Shortener project to strengthen my JavaScript
skills by building a practical browser-based application. The project
gave me an opportunity to work with JavaScript beyond basic exercises
and apply the language to data storage, input validation, DOM
manipulation, and user interaction.

The software accepts a long URL and generates a shorter identifier for
it. The long and short URLs are stored together, while only the
shortened URLs are displayed in the stored URL list. A stored short URL
can be selected to retrieve its matching long URL. The program also
allows individual entries or all stored URLs to be deleted.

My purpose for writing this software was to improve my understanding of
JavaScript syntax and program structure. I used ES6 array methods such
as `map()`, `find()`, and `filter()`, recursion for checking generated
short codes, exception handling with `try...catch` and `throw`, browser
storage for persistence, and DOM events for interaction with the page.

[Software Demo Video](https://youtu.be/pWXyWPmOuvk)

# Development Environment

I developed the project using Visual Studio Code and tested it in Google Chrome web
browser. The application consists of HTML for the page structure, CSS
for the interface and styling, and JavaScript for the program logic.

The main programming language is JavaScript. The project uses the NanoID
JavaScript library to generate short codes. Browser `localStorage` is
used to preserve the URL data between sessions.

# Useful Websites

-   [MDN Web Docs](https://developer.mozilla.org/)

-   [Nano ID](https://github.com/ai/nanoid)

-   [JavaScript.info](https://javascript.info/)

# Future Work

-   Make generated short URLs function as actual redirect links through
    a hosted service.

-   Add and complete the Find feature for searching stored URLs.

-   Add and complete the Clear feature for clearing the input and display fields.

-   Improve the user interface and status messages.
