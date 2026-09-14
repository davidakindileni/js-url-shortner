// --------------------------------------------------
// URL SHORTENER
// Author: Akinsola David Akindileni
// --------------------------------------------------

// External library for generating unique IDs.
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid@5.1.5/+esm";


// --------------------------------------------------
// GET HTML ELEMENTS
// --------------------------------------------------

const input = document.getElementById("longUrl");
const shortUrlInput = document.getElementById("shortUrl");

const shortenButton = document.getElementById("shortenBtn");
const deleteButton = document.getElementById("delBtn");
const deleteAllButton = document.getElementById("delAllUrls");

const list = document.getElementById("urlList");


// --------------------------------------------------
// URL DATABASE
// --------------------------------------------------

// Retrieve the saved array from localStorage.
// If there is nothing saved, start with an empty array.

let urlDatabase = JSON.parse(
    localStorage.getItem("urlDatabase")
) || [];


// --------------------------------------------------
// SAVE ARRAY
// --------------------------------------------------

function saveDatabase() {

    localStorage.setItem(
        "urlDatabase",
        JSON.stringify(urlDatabase)
    );
}


// --------------------------------------------------
// GENERATE UNIQUE SHORT URL
// --------------------------------------------------

// This function uses recursion.
// If a generated short URL already exists,
// the function calls itself again.

function generateUniqueShortUrl() {

    const shortCode = nanoid(6).toUpperCase();

    const shortUrl = `https://${shortCode}`;

    // find() checks whether the generated URL
    // already exists in the array.

    const existingUrl = urlDatabase.find(
        url => url.shortUrl === shortUrl
    );

    if (existingUrl) {

        // Recursive call
        return generateUniqueShortUrl();
    }

    return shortUrl;
}


// --------------------------------------------------
// VALIDATE URL
// --------------------------------------------------

function validateUrl(url) {

    // Empty URL
    if (url.trim() === "") {

        throw new Error(
            "Please enter a long URL."
        );
    }


    // Invalid URL
    try {

        new URL(url);

    } catch {

        throw new Error(
            "Please enter a valid URL."
        );
    }
}


// --------------------------------------------------
// CLEAR FIELDS
// --------------------------------------------------

function clearFields() {

    input.value = "";
    shortUrlInput.value = "";

    // Delete should only become active when
    // an existing URL has been selected.
    deleteButton.disabled = true;

    // Return focus to the long URL field.
    input.focus();
}


// --------------------------------------------------
// DISPLAY STORED URLS
// --------------------------------------------------

function displayUrls() {

    // Remove the existing list before rebuilding it.
    list.innerHTML = "";


    // map() is used to create each list item.
    const urlItems = urlDatabase.map(function (url) {

        const li = document.createElement("li");


        // ------------------------------------------
        // CREATE CLICKABLE SHORT URL
        // ------------------------------------------

        const shortLink = document.createElement("a");

        shortLink.href = "#";

        shortLink.textContent = url.shortUrl;


        // ------------------------------------------
        // WHEN SHORT URL IS CLICKED
        // ------------------------------------------

        shortLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                // Search the array using find().
                const selectedUrl = urlDatabase.find(
                    item => item.shortUrl === url.shortUrl
                );


                if (selectedUrl) {

                    // Display the long URL.
                    input.value = selectedUrl.longUrl;

                    // Display the short URL.
                    shortUrlInput.value =
                        selectedUrl.shortUrl;


                    // Activate Delete button.
                    deleteButton.disabled = false;

                    input.focus();
                }
            }
        );


        // ------------------------------------------
        // CREATE X BUTTON
        // ------------------------------------------

        const itemDeleteButton =
            document.createElement("button");

        itemDeleteButton.id = "delItemBtn";

        itemDeleteButton.type = "button";

        itemDeleteButton.textContent = "X";


        // ------------------------------------------
        // X BUTTON DELETE
        // ------------------------------------------

        itemDeleteButton.addEventListener(
            "click",
            function () {

                const answer = confirm(
                    "Are you sure you want to delete this URL?"
                );


                if (answer) {

                    // filter() creates a new array
                    // without the selected URL.

                    urlDatabase = urlDatabase.filter(
                        item =>
                            item.shortUrl !==
                            url.shortUrl
                    );


                    // Save the changed array.
                    saveDatabase();


                    // Refresh the displayed list.
                    displayUrls();


                    // Clear the fields.
                    clearFields();
                }
            }
        );


        // Add the short URL and X button
        // to the list item.

        li.appendChild(shortLink);
        li.appendChild(itemDeleteButton);


        return li;
    });


    // Add all list items to the page.
    urlItems.forEach(function (item) {

        list.appendChild(item);

    });
}


// --------------------------------------------------
// SHORTEN BUTTON
// --------------------------------------------------

shortenButton.addEventListener(
    "click",
    function () {

        try {

            const longUrl = input.value.trim();


            // Check the URL.
            validateUrl(longUrl);


            // Check if the long URL already exists.
            const existingUrl = urlDatabase.find(
                url => url.longUrl === longUrl
            );


            if (existingUrl) {

                alert("URL already exists!");

                input.focus();

                return;
            }


            // Generate a unique short URL.
            const shortUrl =
                generateUniqueShortUrl();


            // Create the URL object.
            const newUrl = {

                longUrl: longUrl,

                shortUrl: shortUrl

            };


            // Add the object to the array.
            urlDatabase.push(newUrl);


            // Save the array.
            saveDatabase();


            // Refresh the list.
            displayUrls();


            // Success message.
            alert("URL added successfully.");


            // Clear both fields and return
            // focus to the long URL input.
            clearFields();

        }

        catch (error) {

            // Handle the error.
            alert(error.message);

            // Return to input.
            input.focus();
        }
    }
);


// --------------------------------------------------
// DELETE SELECTED URL
// --------------------------------------------------

deleteButton.addEventListener(
    "click",
    function () {

        // Do nothing if Delete is disabled.
        if (deleteButton.disabled) {

            return;
        }


        const longUrl = input.value.trim();

        const shortUrl =
            shortUrlInput.value.trim();


        // Safety check.
        if (!longUrl || !shortUrl) {

            return;
        }


        // Warning message.
        const answer = confirm(
            "WARNING: Are you sure you want to delete this URL?"
        );


        if (answer) {

            // filter() removes the selected URL.
            urlDatabase = urlDatabase.filter(
                function (url) {

                    return !(
                        url.longUrl === longUrl &&
                        url.shortUrl === shortUrl
                    );

                }
            );


            // Save updated array.
            saveDatabase();


            // Refresh the list.
            displayUrls();


            // Clear fields and disable Delete.
            clearFields();
        }
    }
);


// --------------------------------------------------
// DELETE ALL URLS
// --------------------------------------------------

deleteAllButton.addEventListener(
    "click",
    function () {

        // Check if there is anything to delete.
        if (urlDatabase.length === 0) {

            alert(
                "There are no stored URLs to delete."
            );

            input.focus();

            return;
        }


        // Warning message.
        const answer = confirm(
            "WARNING: This will delete ALL stored URLs. Are you sure?"
        );


        if (answer) {

            // Empty the array.
            urlDatabase = [];


            // Save the empty array.
            saveDatabase();


            // Refresh the list.
            displayUrls();


            // Clear the fields.
            clearFields();


            alert(
                "All stored URLs have been deleted."
            );
        }


        input.focus();
    }
);


// --------------------------------------------------
// INITIALIZE PROGRAM
// --------------------------------------------------

// Display previously stored URLs.
displayUrls();

// Start with the cursor in the long URL field.
input.focus();