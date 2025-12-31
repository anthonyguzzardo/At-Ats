/**
 * AT-ATs Client Application
 *
 * Handles file upload, API communication, and result display.
 * All DOM manipulation uses safe methods (no innerHTML).
 */
/**
 * Application state.
 * Stores the currently uploaded file.
 */
let uploadedFile = null;
/**
 * DOM element references.
 * Cached at startup for performance.
 */
const elements = {
    aurebeshDisplay: document.querySelectorAll(".aurebesh"),
    normalDisplay: document.querySelectorAll(".normal"),
    addFileButton: document.querySelector("#add_file_button"),
    hiddenFileInput: document.querySelector("#hidden_file_input"),
    marqueeTrack: document.querySelector(".marquee_track"),
    resultsContainer: document.querySelector(".resume_grade_container"),
};
/**
 * Reads the text content from a file.
 *
 * @param file - The file to read.
 * @returns A promise that resolves to the file text content.
 */
async function readFileText(file) {
    return await file.text();
}
/**
 * Sends the resume to the server for analysis.
 *
 * @param resumeText - The text content of the resume.
 * @param fileName   - The original filename.
 * @returns A promise that resolves to the Star Wars result.
 * @throws Error if the request fails.
 */
async function analyzeResume(resumeText, fileName) {
    const requestBody = {
        resumeText,
        fileName,
    };
    const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
    }
    return await response.json();
}
/**
 * Returns the CSS variable name for the designation color.
 * Used to color the designation badge on the result card.
 *
 * @param designation - The designation category name.
 * @returns The CSS variable reference string.
 */
function getDesignationColor(designation) {
    switch (designation) {
        case "Force-Sensitive":
            return "var(--jedi-blue)";
        case "Droids":
            return "var(--droid-gold)";
        case "Organic Personnel":
            return "var(--rebel-orange)";
        case "Cyborgs":
            return "var(--droid-gray)";
        case "Non-Combat Roles":
            return "var(--neutral-purple)";
        default:
            return "var(--sith-red)";
    }
}
/**
 * Creates a DOM element with the given tag, class, and text content.
 * This is a safe alternative to innerHTML.
 *
 * @param tag       - The HTML tag name.
 * @param className - The CSS class name (optional).
 * @param text      - The text content (optional).
 * @returns The created element.
 */
function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) {
        el.className = className;
    }
    if (text) {
        el.textContent = text;
    }
    return el;
}
/**
 * Creates and returns a result card element for the given Star Wars result.
 * Uses safe DOM methods instead of innerHTML.
 *
 * @param result - The Star Wars analysis result.
 * @returns The result card element.
 */
function createResultCard(result) {
    const card = createElement("div", "result_card");
    // Character name heading
    const characterName = createElement("h2", "result_character", result.character);
    card.appendChild(characterName);
    // Badge container for designation and rank
    const badgeContainer = createElement("div");
    badgeContainer.style.marginBottom = "8px";
    // Designation badge
    const designationBadge = createElement("span", "result_designation", result.designation);
    designationBadge.style.background = getDesignationColor(result.designation);
    badgeContainer.appendChild(designationBadge);
    // Rank badge
    const rankLabel = result.rank_id.replace(/_/g, " ");
    const rankBadge = createElement("span", "result_rank", rankLabel);
    badgeContainer.appendChild(rankBadge);
    card.appendChild(badgeContainer);
    // Evidence excerpt
    const evidence = createElement("blockquote", "result_evidence");
    evidence.textContent = `"${result.evidence_excerpt}"`;
    card.appendChild(evidence);
    // Reasoning paragraph
    const reasoning = createElement("p", "result_reasoning", result.reasoning);
    card.appendChild(reasoning);
    return card;
}
/**
 * Creates and returns a loading indicator element.
 *
 * @returns The loader element.
 */
function createLoader() {
    return createElement("div", "lightsaber_loader");
}
/**
 * Creates and returns an error message element.
 *
 * @param message - The error message to display.
 * @returns The error element.
 */
function createErrorElement(message) {
    const errorDiv = createElement("div", "error_message");
    const errorText = createElement("p", undefined, message);
    errorDiv.appendChild(errorText);
    return errorDiv;
}
/**
 * Updates the marquee display with the new filename.
 *
 * @param fileName - The filename to display.
 */
function updateMarqueeDisplay(fileName) {
    elements.normalDisplay.forEach(el => {
        el.textContent = fileName;
    });
    elements.aurebeshDisplay.forEach(el => {
        el.textContent = fileName;
    });
    // Restart marquee animation
    if (elements.marqueeTrack) {
        elements.marqueeTrack.style.animation = "none";
        void elements.marqueeTrack.offsetHeight;
        elements.marqueeTrack.style.animation = "";
    }
}
/**
 * Updates the upload button text.
 *
 * @param text - The new button text.
 */
function updateButtonText(text) {
    if (elements.addFileButton) {
        elements.addFileButton.textContent = text;
    }
}
/**
 * Clears all child elements from the results container.
 */
function clearResults() {
    if (elements.resultsContainer) {
        elements.resultsContainer.innerHTML = "";
    }
}
/**
 * Handles the file upload process.
 * Reads the file, sends it for analysis, and displays the result.
 *
 * @param file - The uploaded file.
 */
async function handleFileUpload(file) {
    if (!elements.resultsContainer) {
        console.error("Results container not found");
        return;
    }
    // Update UI
    updateMarqueeDisplay(file.name);
    updateButtonText("Replace Resume");
    clearResults();
    // Show loader
    const loader = createLoader();
    elements.resultsContainer.appendChild(loader);
    try {
        const resumeText = await readFileText(file);
        const result = await analyzeResume(resumeText, file.name);
        const card = createResultCard(result);
        loader.remove();
        elements.resultsContainer.appendChild(card);
    }
    catch (err) {
        console.error("Analysis error:", err);
        loader.remove();
        const errorMessage = err instanceof Error ? err.message : "Analysis failed";
        const errorElement = createErrorElement(errorMessage);
        elements.resultsContainer.appendChild(errorElement);
    }
}
/**
 * Initialize event listeners.
 */
function init() {
    // Button click opens file picker
    elements.addFileButton?.addEventListener("click", () => {
        elements.hiddenFileInput?.click();
    });
    // File selection triggers analysis
    elements.hiddenFileInput?.addEventListener("change", (event) => {
        const input = event.target;
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        uploadedFile = file;
        handleFileUpload(file);
    });
}
// Start the application
init();
export {};
