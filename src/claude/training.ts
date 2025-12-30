import { type Designation, starWarsDesignationsMarkdown} from '../designation.js'; // Adjust path as needed

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  // defaults to process.env.ANTHROPIC_API_KEY
  apiKey: process.env.ANTHROPIC_API_KEY ?? "ANTHROPIC_API_KEY",
});

const systemInstruction = `
You are an expert analyst.

Your task is to analyze a resume and determine which Star Wars character the candidate most closely aligns with.

You are NOT inventing categories.
You MUST choose from the provided Star Wars designations and hierarchies.

I have already defined the designation system for you.
You must respect the hierarchy structure and use canonical rank IDs exactly as provided.

You will:
1. Read the resume
2. Select the best matching designation
3. Select the most appropriate rank ID within that designation
4. Select a representative Star Wars character
5. Provide concise reasoning grounded in resume evidence

Return your answer in strict JSON.
Do not include markdown or extra commentary.
`.trim();


const explainStarwarsMarkdownStructure: string = `
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
### Example Output 1
{
  "designation": "Force-Sensitive",
  "rank_id": "KNIGHT",
  "character": "Obi-Wan Kenobi",
  "reasoning": "Demonstrates strong mentorship, calm decision-making under pressure, and a consistent moral compass."
}

### Example Output 2
{
  "designation": "Droids",
  "rank_id": "ASTROMECH",
  "character": "R2-D2",
  "reasoning": "Highly reliable, technically versatile, and repeatedly instrumental behind the scenes without seeking credit."
}

### Example Output 3
{
  "designation": "Organic Personnel",
  "rank_id": "IMPERIAL_OFFICERS",
  "character": "Dedra Meero",
  "reasoning": "Analytical, process-driven, and persistent, with strong attention to detail and institutional navigation."
}
`.trim();

const messageBatch = await client.messages.batches.create({
  requests: [
    {
      custom_id: "resume-to-starwars-analysis",
      params: {
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 500,

        system: systemInstruction,

        messages: [
          {
            role: "user",
            content: `
Below is the Star Wars designation reference.

${starWarsDesignationsMarkdown}

---

Explanation of the structure:

${explainStarwarsMarkdownStructure}

---

Example return formats:

${exampleReturnSets}

---

Now analyze the following resume and return the best matching Star Wars character.

<RESUME>
[PASTE RESUME TEXT HERE]
</RESUME>
            `.trim(),
          },
        ],
      },
    },
  ],
});
