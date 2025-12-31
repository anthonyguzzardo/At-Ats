/**
 * Claude Integration Module
 *
 * Handles communication with the Claude API to analyze resumes
 * and classify them as Star Wars characters.
 */

import Anthropic from "@anthropic-ai/sdk";
import { starWarsDesignationsMarkdown } from "../designation.js";
import type { StarWarsResult } from "../shared/types.js";


/**
 * Re-export for backwards compatibility.
 * New code should import from shared/types.js directly.
 */
export type ResumeStarWarsResult = StarWarsResult;


/**
 * The Anthropic client instance.
 * Uses the API key from environment variables.
 */
const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});


/**
 * System instruction for the Claude model.
 * Defines the task, constraints, and expected output format.
 */
const SYSTEM_INSTRUCTION = `
You are an expert analyst.

Your task is to analyze a resume and determine which Star Wars character the candidate most closely aligns with.

You are NOT inventing categories.
You MUST choose from the provided Star Wars designations and hierarchies.
You MUST use canonical rank IDs exactly as provided.

You must base your decision on the resume content only.
Do not rely on stereotypes or fictional lore alone.

You will:
1. Read the resume
2. Select the best matching designation
3. Select the most appropriate rank ID within that designation
4. Select a representative Star Wars character
5. Extract a specific excerpt from the resume that supports your decision
6. Provide concise reasoning explaining the mapping

Return your answer in strict JSON with the following fields:
- designation
- rank_id
- character
- evidence_excerpt
- reasoning

Do not include markdown, explanations, or extra keys.
`.trim();


/**
 * Explains the structure of the designation markdown document.
 * Helps Claude understand how to interpret the reference material.
 */
const MARKDOWN_STRUCTURE_EXPLANATION = `
This document is generated from a structured Star Wars designation model.

Each designation follows the same layout:

## Name
The name of the designation category (for example: Force-Sensitive, Droids, Organic Personnel).

## Hierarchy
A grouped list of ranks or types within the designation.
- Headings represent hierarchy groups (such as Jedi, Sith, or Type).
- Each bullet shows the human-readable label, followed by its canonical ID in parentheses.
- The order shown is the authoritative order defined in the hierarchy data.

## Examples
Concrete character examples keyed by hierarchy rank.
- Each subheading corresponds to a hierarchy rank ID.
- Bullet points list characters that belong to that rank.
- Empty ranks may be omitted if no examples are present.

The hierarchy defines what ranks exist.
The examples section only references those ranks by ID, ensuring consistency.

This separation allows stable machine-safe identifiers while preserving human-readable labels.
`.trim();


/**
 * Example JSON responses to guide Claude's output format.
 * Shows the expected structure for different designation types.
 */
const EXAMPLE_RESPONSES = `
{
  "designation": "Force-Sensitive",
  "rank_id": "KNIGHT",
  "character": "Obi-Wan Kenobi",
  "evidence_excerpt": "Led a cross-functional team of engineers, mentoring junior developers while delivering critical systems under tight deadlines.",
  "reasoning": "The resume emphasizes mentorship, leadership, and calm execution under pressure."
}

{
  "designation": "Droids",
  "rank_id": "ASTROMECH",
  "character": "R2-D2",
  "evidence_excerpt": "Built internal automation tools that quietly resolved recurring infrastructure failures without executive oversight.",
  "reasoning": "Demonstrates reliability and technical impact without seeking recognition."
}

{
  "designation": "Organic Personnel",
  "rank_id": "IMPERIAL_OFFICERS",
  "character": "Dedra Meero",
  "evidence_excerpt": "Developed operational dashboards and enforced compliance across departments.",
  "reasoning": "Strong alignment with structured, analytical authority-driven roles."
}
`.trim();


/**
 * Builds the complete message to send to Claude for resume analysis.
 * Combines the designation reference, structure explanation, examples, and the actual resume.
 *
 * @param resumeText - The text content of the resume to analyze.
 * @param fileName   - The original filename of the resume.
 * @returns The complete prompt message string.
 */
function buildAnalysisPrompt(resumeText: string, fileName: string): string {
    return `
Below is the Star Wars designation reference.

${starWarsDesignationsMarkdown}

---

Explanation of the structure:

${MARKDOWN_STRUCTURE_EXPLANATION}

---

Example return formats:

${EXAMPLE_RESPONSES}

---

Now analyze the following resume.

File name: ${fileName}

<RESUME>
${resumeText}
</RESUME>
`.trim();
}


/**
 * Analyzes a resume using Claude and returns a Star Wars character classification.
 *
 * @param resumeText - The text content of the resume.
 * @param fileName   - The original filename of the resume.
 * @returns A promise that resolves to the Star Wars result.
 * @throws Error if Claude returns no text or invalid JSON.
 */
export async function analyzeResumeWithClaude(
    resumeText : string,
    fileName   : string
): Promise<StarWarsResult> {

    const prompt = buildAnalysisPrompt(resumeText, fileName);

    const response = await client.messages.create({
        model      : "claude-sonnet-4-5-20250929",
        max_tokens : 700,
        system     : SYSTEM_INSTRUCTION,
        messages   : [
            {
                role    : "user",
                content : prompt,
            },
        ],
    });

    // Extract text content from the response
    const textBlocks = response.content.filter(
        (block): block is Anthropic.TextBlock => block.type === "text"
    );

    const text = textBlocks.map(block => block.text).join("");

    if (!text) {
        throw new Error("No text content returned from Claude");
    }

    // Strip markdown code block if present
    let jsonText = text.trim();
    if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }

    // Parse and return the JSON response
    const result = JSON.parse(jsonText) as StarWarsResult;

    return result;
}
