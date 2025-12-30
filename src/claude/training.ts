import Anthropic from "@anthropic-ai/sdk";
import { starWarsDesignationsMarkdown } from "../designation.js";

// ======================
// TYPES
// ======================
export type ResumeStarWarsResult = {
  designation      : string;
  rank_id          : string;
  character        : string;
  evidence_excerpt : string;
  reasoning        : string;
};

// ======================
// CLIENT
// ======================
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "ANTHROPIC_API_KEY",
});

// ======================
// SYSTEM INSTRUCTION
// ======================
const systemInstruction = `
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

// ======================
// SUPPORTING PROMPT TEXT
// ======================
const explainStarwarsMarkdownStructure = `
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

const exampleReturnSets = `
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

// ======================
// MESSAGE BUILDER
// ======================
function buildResumeAnalysisMessage(
  resumeText: string,
  fileName: string
): string {
  return `
Below is the Star Wars designation reference.

${starWarsDesignationsMarkdown}

---

Explanation of the structure:

${explainStarwarsMarkdownStructure}

---

Example return formats:

${exampleReturnSets}

---

Now analyze the following resume.

File name: ${fileName}

<RESUME>
${resumeText}
</RESUME>
`.trim();
}

// ======================
// EXPORTED ENTRY POINT
// ======================
export async function analyzeResumeWithClaude(
  resumeText: string,
  fileName: string
): Promise<ResumeStarWarsResult> {

    const message = buildResumeAnalysisMessage(resumeText, fileName);

    const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 700,
    system: systemInstruction,
    messages: [
        {
        role: "user",
        content: message,
        },
    ],
    });

    const text = response.content
    .filter(block => block.type === "text")
    .map(block => block.text)
    .join("");

    if (!text) {
    throw new Error("No text content returned from Claude");
    }

    return JSON.parse(text) as ResumeStarWarsResult;

}
