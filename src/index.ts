// NOTE: Designation is not used in this file — remove the import
// import type { Designation } from './designation.js';

// ======================
// STATE
// ======================
let uploadedFile: File | null = null;

// ======================
// DOM REFERENCES
// ======================
const aurebeshDisplay = document.querySelectorAll<HTMLSpanElement>(".aurebesh");
const normalDisplay   = document.querySelectorAll<HTMLSpanElement>(".normal");
const addFileButton   = document.querySelector<HTMLButtonElement>("#add_file_button");
const hiddenFileInput = document.querySelector<HTMLInputElement>("#hidden_file_input");

// ======================
// TYPES
// ======================
type StarWarsResult = {
  designation : string;
  rank_id     : string;
  character   : string;
  reasoning   : string;
};

// ======================
// HELPERS
// ======================
async function readResumeText(file: File): Promise<string> {
  // Keep it simple: backend does real parsing
  return await file.text();
}

async function analyzeResume(resumeText: string): Promise<StarWarsResult> {
  const res = await fetch("/api/analyze-resume", {
    method  : "POST",
    headers : { "Content-Type": "application/json" },
    body    : JSON.stringify({ resume: resumeText }),
  });

  if (!res.ok) {
    throw new Error("Resume analysis failed");
  }

  return await res.json();
}

function colorForDesignation(designation: string): string {
  switch (designation) {
    case "Force-Sensitive":
      return "var(--jedi-blue)";
    case "Sith":
      return "var(--sith-red)";
    case "Droids":
      return "var(--droid-gray)";
    default:
      return "var(--neutral-purple)";
  }
}

// ======================
// EVENT LISTENERS
// ======================
addFileButton?.addEventListener("click", () => {
  if (!hiddenFileInput) return;
  hiddenFileInput.click();
});

hiddenFileInput?.addEventListener("change", async (ev: Event) => {
  const input = ev.target as HTMLInputElement;
  uploadedFile = input.files?.[0] ?? null;

  if (!uploadedFile) return;

  // Update filename display
  normalDisplay.forEach(el => (el.innerText = uploadedFile!.name));
  aurebeshDisplay.forEach(el => (el.innerText = uploadedFile!.name));

  const track = document.querySelector(".marquee-track") as HTMLElement | null;
  if (track) {
    track.style.animation = "none";
    track.offsetHeight;
    track.style.animation = "";
  }

  addFileButton && (addFileButton.innerText = "Replace Resume");

  const container = document.querySelector(".resume_grade_container");
  if (!container) return;

  // CREATE LOADER ONCE
  const loader = document.createElement("div");
  loader.className = "lightsaber-loader";
  container.appendChild(loader);

  try {
    // Analyze resume
    const resumeText = await readResumeText(uploadedFile);
    const result     = await analyzeResume(resumeText);

    // Render result
    const characterRow = document.createElement("div");
    characterRow.className = "resume_grade_container_row";

    const color = colorForDesignation(result.designation);

    characterRow.innerHTML = `
      <div class="character-badge" style="background:${color}"></div>
      <h1>${result.character}</h1>
      <div class="resume_example">${result.rank_id}</div>
      <p>${result.reasoning}</p>
    `;

    container.appendChild(characterRow);

  } catch (err) {
    console.error(err);
    alert("Failed to analyze resume.");
  } finally {
    // ALWAYS REMOVE LOADER
    loader.remove();
  }
});
