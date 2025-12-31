/**
 * Shared type definitions for AT-ATs.
 * These types are used by both client and server to ensure consistency.
 */

/**
 * Request body sent from client to server when analyzing a resume.
 */
export type AnalyzeRequest = {
    resumeText : string;
    fileName   : string;
};

/**
 * Result returned from Claude after analyzing a resume.
 * Maps the candidate to a Star Wars character based on resume content.
 */
export type StarWarsResult = {
    designation      : string;
    rank_id          : string;
    character        : string;
    evidence_excerpt : string;
    reasoning        : string;
};

/**
 * Error response returned when something goes wrong.
 */
export type ErrorResponse = {
    error : string;
};
