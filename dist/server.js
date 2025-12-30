import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { starWarsDesignationsMarkdown } from "./designation.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const DIST_DIR = path.join(__dirname, "..", "dist");
const client = new Anthropic();
const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
};
const systemInstruction = `
You match resumes to Star Wars characters.

Rules:
- Use ONLY the designations and ranks provided
- Pick one character that fits best
- Keep the tagline to 5-8 words max

Return JSON with these exact keys:
- character: string (Star Wars character name)
- role: string (human-readable role like "Jedi Knight" or "Rebel Operative")
- tagline: string (5-8 word summary, punchy, no fluff)

No markdown. No code fences. Just JSON.
`.trim();
function serveStatic(req, res) {
    const url = req.url === "/" ? "/index.html" : req.url;
    // Try public first, then dist (for compiled JS)
    let filePath = path.join(PUBLIC_DIR, url);
    if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, url.replace(/^\/dist/, ""));
    }
    if (!fs.existsSync(filePath)) {
        filePath = path.join(__dirname, "..", url); // fallback for /dist/index.js etc
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        fs.createReadStream(filePath).pipe(res);
        return true;
    }
    return false;
}
async function handleAnalyzeResume(req, res) {
    let body = "";
    for await (const chunk of req) {
        body += chunk;
    }
    const { resume } = JSON.parse(body);
    if (!resume) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing resume text" }));
        return;
    }
    try {
        const message = await client.messages.create({
            model: "claude-sonnet-4-5-20250929",
            max_tokens: 150,
            system: systemInstruction,
            messages: [
                {
                    role: "user",
                    content: `
Below is the Star Wars designation reference:

${starWarsDesignationsMarkdown}

---

Now analyze the following resume and return the best matching Star Wars character as JSON.

<RESUME>
${resume}
</RESUME>
          `.trim(),
                },
            ],
        });
        // Extract text from response
        const textBlock = message.content.find((block) => block.type === "text");
        let responseText = textBlock?.type === "text" ? textBlock.text : "";
        // Strip markdown code fences if present
        responseText = responseText
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();
        // Parse JSON from response
        const result = JSON.parse(responseText);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    }
    catch (err) {
        console.error("Claude API error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to analyze resume" }));
    }
}
const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    // API routes
    if (req.method === "POST" && req.url === "/api/analyze-resume") {
        await handleAnalyzeResume(req, res);
        return;
    }
    // Static files
    if (req.method === "GET" && serveStatic(req, res)) {
        return;
    }
    // 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
