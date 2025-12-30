// STATE
const displayFile = document.querySelector("#display_file");
const addFileButton = document.querySelector("#add_file_button");
// HTML
// EVENT LISTENERS
// FUNCTIONS
addFileButton?.addEventListener('click', (ev) => {
    try {
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(`Error displaying : ${e.stack}\n\n${e.stack}`);
        }
        else {
            console.error(`Error displaying : ${e}`);
        }
    }
    if (!displayFile)
        return;
    displayFile.value = "markdown";
});
export {};
