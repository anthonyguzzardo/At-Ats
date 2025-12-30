// NOTE: Designation is not used in this file — remove the import
// import type { Designation } from './designation.js';
// ======================
// STATE
// ======================
let uploadedFile = null;
// ======================
// DOM REFERENCES
// ======================
const aurebeshDisplay = document.querySelectorAll(".aurebesh");
const normalDisplay = document.querySelectorAll(".normal");
const addFileButton = document.querySelector("#add_file_button");
const hiddenFileInput = document.querySelector("#hidden_file_input");
// ======================
// HELPERS
// ======================
async function readResumeText(file) {
    // Keep it simple: backend does real parsing
    return await file.text();
}
async function analyzeResume(resumeText) {
    const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText }),
    });
    if (!res.ok) {
        throw new Error("Resume analysis failed");
    }
    return await res.json();
}
// ======================
// EVENT LISTENERS
// ======================
addFileButton?.addEventListener("click", () => {
    if (!hiddenFileInput)
        return;
    hiddenFileInput.click();
});
hiddenFileInput?.addEventListener("change", async (ev) => {
    const input = ev.target;
    uploadedFile = input.files?.[0] ?? null;
    if (!uploadedFile)
        return;
    // Update filename display
    normalDisplay.forEach(el => (el.innerText = uploadedFile.name));
    aurebeshDisplay.forEach(el => (el.innerText = uploadedFile.name));
    const track = document.querySelector(".marquee-track");
    if (track) {
        track.style.animation = "none";
        track.offsetHeight;
        track.style.animation = "";
    }
    addFileButton && (addFileButton.innerText = "Replace Resume");
    const container = document.querySelector(".resume_grade_container");
    if (!container)
        return;
    // CREATE LOADER ONCE
    const loader = document.createElement("div");
    loader.className = "lightsaber-loader";
    container.appendChild(loader);
    try {
        // Analyze resume
        const resumeText = await readResumeText(uploadedFile);
        const result = await analyzeResume(resumeText);
        // Render result
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
      <h2 class="result-character">${result.character}</h2>
      <span class="result-role">${result.role}</span>
      <p class="result-tagline">"${result.tagline}"</p>
    `;
        container.appendChild(card);
    }
    catch (err) {
        console.error(err);
        alert("Failed to analyze resume.");
    }
    finally {
        // ALWAYS REMOVE LOADER
        loader.remove();
    }
});
export {};
