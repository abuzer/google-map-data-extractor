 async function processLinks() {
    var links = document.querySelectorAll('[role="feed"] a');

    for (const link of links) {
        var selectLink = link;
        selectLink.click();

        // Wait for 3 seconds before processing the right pane
        await new Promise(resolve => setTimeout(resolve, 3000));

        var rightPane = document.querySelectorAll('[role="main"]')[1];

        if (!rightPane) continue; // Skip if rightPane is not found

        var image = rightPane.querySelector('img')?.src || '';
        var title = rightPane.getAttribute('aria-label') || '';
        var address = rightPane.querySelector('[data-tooltip="Copy address"]')?.getAttribute('aria-label') || '';
        var phone = rightPane.querySelector('[data-tooltip="Copy phone number"]')?.getAttribute('aria-label') || '';
        var website = rightPane.querySelector('[data-tooltip="Open website"]')?.getAttribute('aria-label') || '';
        if (website) website = website.replace('Website: ', '');

        var about = '';
        try {
            about = rightPane.querySelector(`[aria-label="About ${title}"]`)?.innerText || '';
        } catch {}

        var serviceLink = '';
        try {
            serviceLink = rightPane.querySelector('[data-tooltip="Open services link"]')?.innerText || '';
        } catch {}

        var bookingLink = '';
        try {
            bookingLink = rightPane.querySelector('[data-tooltip="Open booking link"]')?.href || '';
        } catch {}

        var plusCode = rightPane.querySelector('[data-tooltip="Copy plus code"]')?.href || '';
        var url = window.location.href;

        var postData = { image, about, title, address, phone, website, serviceLink, bookingLink, plusCode, url };
        // Optional: Add additional delay before processing the next link
        chrome.runtime.sendMessage({ action: "sendData", data: postData });
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

// Create a button
var button = document.createElement("button");
button.innerText = "Run Script";
button.style.position = "fixed";
button.style.top = "20px";
button.style.right = "20px";
button.style.padding = "10px 20px";
button.style.background = "#007bff";
button.style.color = "white";
button.style.border = "none";
button.style.cursor = "pointer";
button.style.zIndex = "10000";

// Append button to body
document.body.appendChild(button);

// Add event listener to run your script
button.addEventListener("click", function () {
    console.log("Button clicked! Running content script...");
    
    processLinks();

});


