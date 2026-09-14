// Project Name: js-url-shortner
// Project Description: JS file for js-url-shortner project
// Author: Akinsola David Akindileni
// Date Created: August 29, 2026
// Date Published: September 13, 2026
// Date Last Modified: September 13, 2026

// Import nanoid modoule from CDN
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid@5.1.5/+esm";

// Declare DOM ELEMENTS
const input = document.getElementById("longUrl");
const shortUrlInput = document.getElementById("shortUrl");
const shortenButton = document.getElementById("shortenBtn");
const deleteButton = document.getElementById("delBtn");
const deleteAllButton = document.getElementById("delAllUrls");
const list = document.getElementById("urlList");

// URL DATABASE
// Load the saved array from localStorage.
// If nothing has been saved yet, start with an empty array.
let urlDatabase = JSON.parse(localStorage.getItem("urlDatabase")) || [];

// Save database function
function saveDatabase() {
    localStorage.setItem("urlDatabase", JSON.stringify(urlDatabase));
}

// Generate unique short URL
// If the generated ID already exists, the function
// calls itself again until a unique ID is generated (recursion)
function generateUniqueShortUrl() {
    const shortCode = nanoid(6).toUpperCase();
    const shortUrl = `https://${shortCode}`;
    const existingUrl = urlDatabase.find(
        url => url.shortUrl === shortUrl
    );
    if (existingUrl) {
        return generateUniqueShortUrl();
    }
    return shortUrl;
}


// Validate the URL
function validateUrl(url) {
    // if entered long URL is blank
    if (url.trim() === "") {
      throw new Error("Please enter a long URL.");
    }
    try {
      new URL(url);
    } catch { //
      throw new Error("Please enter a valid URL.");
    }
}

// Display the stored URLs
function displayUrls() {
    // Clear the current list first before re-rendering to avoid duplicates
    list.innerHTML = "";

    // This function read stored URL entries and renders them in the DOM as interactive list items
    // It makes each URL entry a clickable link and add an inline delete button.
    // map() is used to create the list items.
    const urlItems = urlDatabase.map(function (url) {
        const li = document.createElement("li");

        // Create clickable short URL.
        const shortLink = document.createElement("a");
        shortLink.href = "#";
        shortLink.textContent = url.shortUrl;

        // When the short URL is clicked, display both URLs in the input fields
        shortLink.addEventListener("click", function (event) {
            event.preventDefault();
            input.value = url.longUrl;
            shortUrlInput.value = url.shortUrl;

            // Enable Delete button.
            deleteButton.disabled = false;
            input.focus();
        });

        // Create the X delete button.
        const itemDeleteButton = document.createElement("button");
        itemDeleteButton.id = "delItemBtn";
        itemDeleteButton.type = "button";
        itemDeleteButton.textContent = "X";

        // Delete individual item using X.
        itemDeleteButton.addEventListener("click", function () {
            const confirmed = confirm(
              "Are you sure you want to delete this URL?"
            );
            if (confirmed) {
                // filter() creates a new array without the selected URL.
                urlDatabase = urlDatabase.filter(
                  item => item.shortUrl !== url.shortUrl
                );
                saveDatabase();
                displayUrls();
                clearFields();
            }
            input.focus();
        });
        li.appendChild(shortLink);
        li.appendChild(itemDeleteButton);
        return li;
    });

    // Add the generated list items to the page.
    urlItems.forEach(function (item) {
        list.appendChild(item);
    });
}


// Clear input fields
function clearFields() {
    input.value = "";
    shortUrlInput.value = "";
    deleteButton.disabled = true;
    input.focus();
}

// Shorten URL function on click button
shortenButton.addEventListener("click", function () {
    try {
        const longUrl = input.value.trim();
        // Throws an error if the URL is empty or invalid.
        validateUrl(longUrl);
        // Check whether this long URL already exists.
        const existingUrl = urlDatabase.find(
            url => url.longUrl === longUrl
        );
        if (existingUrl) {
            alert("URL already exists!");
            input.focus();
            return;
        }
        // Generate a unique short URL.
        const shortUrl = generateUniqueShortUrl();
        // Create a URL object.
        const newUrl = {
            longUrl: longUrl,
            shortUrl: shortUrl
        };
        // Add the object to the array.
        urlDatabase.push(newUrl);
        // Save the array so it survives page refresh.
        saveDatabase();
        // Display the newly created short URL.
        shortUrlInput.value = shortUrl;
        // Refresh the list.
        displayUrls();
        alert("URL added successfully.");
        clearFields();
        // Keep the long URL available because the
        // Delete button should be usable for this entry.
        deleteButton.disabled = false;
        input.focus();
    } catch (error) {
        // Exception handling.
        alert(error.message);
        input.focus();
    }
});

// Delete selected URL
deleteButton.addEventListener("click", function () {
    if (deleteButton.disabled) {
        return;
    }
    const longUrl = input.value.trim();
    const shortUrl = shortUrlInput.value.trim();
    if (!longUrl || !shortUrl) {
        return;
    }
    const confirmed = confirm(
        "Are you sure you want to delete this URL?"
    );
    if (confirmed) {
        // filter() removes the selected object.
        urlDatabase = urlDatabase.filter(function (url) {
            return !(
              url.longUrl === longUrl &&
              url.shortUrl === shortUrl
            );
        });
        saveDatabase();
        displayUrls();
        clearFields();
    }
});

// Delete all URLS
deleteAllButton.addEventListener("click", function () {
    if (urlDatabase.length === 0) {
        alert("There are no stored URLs to delete.");
        input.focus();
        return;
    }
    const confirmed = confirm(
        "WARNING: This will delete ALL stored URLs. Are you sure?"
    );
    if (confirmed) {
        urlDatabase = [];
        saveDatabase();
        displayUrls();
        clearFields();
        alert("All stored URLs have been deleted.");
    }
    input.focus();
});

// Initial display - Display previously saved URLs when the page loads.
displayUrls();
input.focus();
