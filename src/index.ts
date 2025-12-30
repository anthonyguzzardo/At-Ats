import type { Designation } from './designation.js'; // Adjust path as needed

// STATE
let uploadedFile : File | null;


const aurebeshDisplay   = document.querySelectorAll<HTMLSpanElement>(".aurebesh");
const normalDisplay     = document.querySelectorAll<HTMLSpanElement>(".normal");
const addFileButton     = document.querySelector<HTMLButtonElement>("#add_file_button");
const hiddenFileInput   = document.querySelector<HTMLInputElement>("#hidden_file_input");
// HTML

// EVENT LISTENERS

// FUNCTIONS

addFileButton?.addEventListener('click', (ev : MouseEvent) => {
    try{
        if(!hiddenFileInput) return;
        hiddenFileInput.click();
    }catch(e){
        if(e instanceof Error){
            console.error(`Error displaying : ${e.stack}\n\n${e.stack}`)
        }else{
            console.error(`Error displaying : ${e}`)
        }
    }
})

hiddenFileInput?.addEventListener('change', (ev : Event) => {
    const input = ev.target as HTMLInputElement;
    uploadedFile = input.files?.[0] ?? null;

    if(uploadedFile !== null){
        if(!aurebeshDisplay) return;
        if(!normalDisplay) return;
        if(!addFileButton) return;

        normalDisplay.forEach(el => el.innerText  = uploadedFile!.name );
        aurebeshDisplay.forEach(el => el.innerText   = uploadedFile!.name);
        const track = document.querySelector('.marquee-track') as HTMLElement;
        track.style.animation = 'none';
        track.offsetHeight; // trigger reflow
        track.style.animation = '';

        addFileButton.innerText = "Replace Resume";
        console.log(uploadedFile);
    }
})