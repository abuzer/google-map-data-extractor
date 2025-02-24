chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sendData") {
         fetch("https://petsnvet.com/api/store/update-or-create", {
        // fetch("http://127.0.0.1:8000/api/store/update-or-create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message.data)
        })
        .then(response => response.json())
        .then(data => { 
            console.log("Success:", data)
            return data;
        })
        .catch(error => {
            console.error("Error:", error)
            return data;
        });
    }
});
