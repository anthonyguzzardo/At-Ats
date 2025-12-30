import type { Designation } from './designation.js'; // Adjust path as needed

// STATE
const displayFile = document.querySelector<HTMLElement>("#display_file");
// HTML

// EVENT LISTENERS

// FUNCTIONS

function renderFilePicker(){
    if(!displayFile) return;
    
    displayFile.Value = "file";
}