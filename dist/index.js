// STATE
let uploadedFile;
const aurebeshDisplay = document.querySelectorAll(".aurebesh");
const normalDisplay = document.querySelectorAll(".normal");
const addFileButton = document.querySelector("#add_file_button");
const hiddenFileInput = document.querySelector("#hidden_file_input");
// HTML
// EVENT LISTENERS
// FUNCTIONS
addFileButton?.addEventListener('click', (ev) => {
    try {
        if (!hiddenFileInput)
            return;
        hiddenFileInput.click();
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(`Error displaying : ${e.stack}\n\n${e.stack}`);
        }
        else {
            console.error(`Error displaying : ${e}`);
        }
    }
});
hiddenFileInput?.addEventListener('change', (ev) => {
    const input = ev.target;
    uploadedFile = input.files?.[0] ?? null;
    if (uploadedFile !== null) {
        if (!aurebeshDisplay)
            return;
        if (!normalDisplay)
            return;
        if (!addFileButton)
            return;
        normalDisplay.forEach(el => el.innerText = uploadedFile.name);
        aurebeshDisplay.forEach(el => el.innerText = uploadedFile.name);
        const track = document.querySelector('.marquee-track');
        track.style.animation = 'none';
        track.offsetHeight; // trigger reflow
        track.style.animation = '';
        addFileButton.innerText = "Replace Resume";
        console.log(uploadedFile);
    }
});
export {};
