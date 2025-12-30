import type { Designation } from './designation.js'; // Adjust path as needed

// STATE
const displayFile   = document.querySelector<HTMLInputElement>("#display_file");
const addFileButton = document.querySelector<HTMLButtonElement>("#add_file_button"); 

// HTML

// EVENT LISTENERS

// FUNCTIONS

addFileButton?.addEventListener('click', (ev : MouseEvent) => {
    try{

    }catch(e){
        if(e instanceof Error){
            console.error(`Error displaying : ${e.stack}\n\n${e.stack}`)
        }else{
            console.error(`Error displaying : ${e}`)
        }
    }
    if(!displayFile) return;
    displayFile.value = "markdown";
})