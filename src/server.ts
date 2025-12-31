/**
 * AT-ATs HTTP Server
 *
 * Serves static files from public/ and dist/ directories,
 * and provides the resume analysis API endpoint.
 */

import http, { IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { analyzeResumeWithClaude } from "./claude/training.js";
import type { AnalyzeRequest, ErrorResponse } from "./shared/types.js";


/**
 * Directory paths for static file serving.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const DIST_DIR   = path.join(__dirname);


/**
 * Maps file extensions to their MIME types.
 * Used when serving static files to set the correct Content-Type header.
 */
const MIME_TYPES: Record<string, string> = {
    ".html" : "text/html",
    ".css"  : "text/css",
    ".js"   : "application/javascript",
    ".json" : "application/json",
    ".png"  : "image/png",
    ".jpg"  : "image/jpeg",
    ".jpeg" : "image/jpeg",
    ".gif"  : "image/gif",
    ".svg"  : "image/svg+xml",
    ".ico"  : "image/x-icon",
    ".woff" : "font/woff",
    ".woff2": "font/woff2",
    ".ttf"  : "font/ttf",
    ".otf"  : "font/otf",
    ".pdf"  : "application/pdf",
    ".md"   : "text/markdown",
};


/**
 * Returns the MIME type for a given file path based on its extension.
 * Defaults to application/octet-stream if the extension is not recognized.
 *
 * @param filePath - The path to the file.
 * @returns The MIME type string.
 */
function getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || "application/octet-stream";
}


/**
 * Attempts to serve a static file from the given directory.
 * If the file exists, it streams the content to the response.
 * If the file does not exist, it returns false so the caller can try another directory.
 *
 * @param dir      - The base directory to look for the file.
 * @param urlPath  - The URL path requested by the client.
 * @param res      - The HTTP response object.
 * @returns A promise that resolves to true if the file was served, false otherwise.
 */
async function tryServeFile(
    dir     : string,
    urlPath : string,
    res     : ServerResponse
): Promise<boolean> {

    let filePath = path.join(dir, urlPath);

    // If requesting a directory, look for index.html
    if (urlPath === "/" || urlPath === "") {
        filePath = path.join(dir, "index.html");
    }

    // Prevent directory traversal attacks
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(path.resolve(dir))) {
        return false;
    }

    return new Promise((resolve) => {
        fs.stat(resolved, (err, stats) => {
            if (err || !stats.isFile()) {
                resolve(false);
                return;
            }

            const mimeType = getMimeType(resolved);
            res.writeHead(200, { "Content-Type": mimeType });

            const stream = fs.createReadStream(resolved);
            stream.pipe(res);
            stream.on("error", () => {
                res.end();
            });

            resolve(true);
        });
    });
}


/**
 * Reads the entire request body and returns it as a string.
 * Used for parsing JSON POST bodies.
 *
 * @param req - The HTTP request object.
 * @returns A promise that resolves to the body string.
 */
function readRequestBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];

        req.on("data", (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on("end", () => {
            resolve(Buffer.concat(chunks).toString("utf-8"));
        });

        req.on("error", (err) => {
            reject(err);
        });
    });
}


/**
 * Sends a JSON response with the given status code and data.
 *
 * @param res        - The HTTP response object.
 * @param statusCode - The HTTP status code to send.
 * @param data       - The data to serialize as JSON.
 */
function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}


/**
 * Handles the POST /api/analyze-resume endpoint.
 * Parses the request body, validates required fields, calls Claude,
 * and returns the Star Wars character result.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
async function handleAnalyzeResume(
    req : IncomingMessage,
    res : ServerResponse
): Promise<void> {

    try {
        const body   = await readRequestBody(req);
        const parsed = JSON.parse(body) as AnalyzeRequest;

        if (!parsed.resumeText || !parsed.fileName) {
            const error: ErrorResponse = { error: "Missing resumeText or fileName" };
            sendJson(res, 400, error);
            return;
        }

        const result = await analyzeResumeWithClaude(
            parsed.resumeText,
            parsed.fileName
        );

        sendJson(res, 200, result);

    } catch (err) {
        console.error("Resume analysis error:", err);
        const error: ErrorResponse = { error: "Resume analysis failed" };
        sendJson(res, 500, error);
    }
}


/**
 * Main request handler for the HTTP server.
 * Routes requests to the appropriate handler based on method and URL.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
async function handleRequest(
    req : IncomingMessage,
    res : ServerResponse
): Promise<void> {

    const method  = req.method || "GET";
    const urlPath = req.url || "/";

    // API endpoint: analyze resume
    if (method === "POST" && urlPath === "/api/analyze-resume") {
        await handleAnalyzeResume(req, res);
        return;
    }

    // Static file serving for GET requests
    if (method === "GET") {
        // Try public directory first, then dist directory
        const servedFromPublic = await tryServeFile(PUBLIC_DIR, urlPath, res);
        if (servedFromPublic) {
            return;
        }

        const servedFromDist = await tryServeFile(DIST_DIR, urlPath, res);
        if (servedFromDist) {
            return;
        }

        // File not found
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
    }

    // Method not allowed for non-GET, non-POST requests
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
}


/**
 * The HTTP server instance.
 */
const server = http.createServer(handleRequest);


/**
 * Server configuration.
 */
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;


/**
 * Start the server.
 */
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Serving static files from: ${PUBLIC_DIR}`);
    console.log(`Serving compiled JS from: ${DIST_DIR}`);
});
