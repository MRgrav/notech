document.addEventListener("DOMContentLoaded", function () {
    const noteArea = document.getElementById("note");
    const saveButton = document.getElementById("save");
    const clearButton = document.getElementById("clear");

    // Load saved note
    chrome.storage.local.get("note", function (data) {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving note:", chrome.runtime.lastError);
            noteArea.value = ""; // Default to empty if there's an error
            return;
        }

        // Check if data.note exists and is a string
        if (data && typeof data.note === "string") {
            noteArea.value = data.note;
        } else {
            noteArea.value = ""; // Ensure the textarea is empty if no note is found
        }
    });

    // Save note
    saveButton.addEventListener("click", function () {
        const note = noteArea.value;
        chrome.storage.local.set({ note: note }, function () {
            if (chrome.runtime.lastError) {
                console.error("Error saving note:", chrome.runtime.lastError);
                alert("Error saving note!");
                return;
            }
            alert("Note saved!");
        });
    });

    // Clear note
    clearButton.addEventListener("click", function () {
        noteArea.value = "";
        chrome.storage.local.remove("note", function () {
            if (chrome.runtime.lastError) {
                console.error("Error clearing note:", chrome.runtime.lastError);
                alert("Error clearing note!");
                return;
            }
            alert("Note cleared!");
        });
    });
});
