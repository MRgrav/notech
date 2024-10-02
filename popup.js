document.addEventListener("DOMContentLoaded", function () {
    const noteArea = document.getElementById("note");
    const saveButton = document.getElementById("save");
    const clearButton = document.getElementById("clear");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const header = document.querySelector("h3"); // Select the h3 element

    // Load saved note
    chrome.storage.sync.get("note", function (data) {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving note:", chrome.runtime.lastError);
            noteArea.value = ""; // Default to empty if there's an error
            return;
        }

        if (data && typeof data.note === "string") {
            noteArea.value = data.note;
        } else {
            noteArea.value = ""; // Ensure the textarea is empty if no note is found
        }
    });

    // Load dark mode preference
    chrome.storage.sync.get("darkMode", function (data) {
        if (data.darkMode) {
            document.body.classList.add("dark-mode");
            header.classList.add("dark-mode"); // Apply dark mode to the header
            noteArea.classList.add("dark-mode");
            darkModeToggle.checked = true;
        }
    });

    // Toggle dark mode
    darkModeToggle.addEventListener("change", function () {
        if (darkModeToggle.checked) {
            document.body.classList.add("dark-mode");
            header.classList.add("dark-mode"); // Apply dark mode to the header
            noteArea.classList.add("dark-mode");
            chrome.storage.sync.set({ darkMode: true });
        } else {
            document.body.classList.remove("dark-mode");
            header.classList.remove("dark-mode"); // Remove dark mode from the header
            noteArea.classList.remove("dark-mode");
            chrome.storage.sync.set({ darkMode: false });
        }
    });

    // Save note
    saveButton.addEventListener("click", function () {
        const note = noteArea.value;
        chrome.storage.sync.set({ note: note }, function () {
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
        chrome.storage.sync.remove("note", function () {
            if (chrome.runtime.lastError) {
                console.error("Error clearing note:", chrome.runtime.lastError);
                alert("Error clearing note!");
                return;
            }
            alert("Note cleared!");
        });
    });
});
