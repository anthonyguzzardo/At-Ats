/**
 * Star Wars Designation System
 *
 * Defines the hierarchy of Star Wars character categories used to classify resumes.
 * Each designation contains a hierarchy of ranks and example characters.
 */
/**
 * Force-Sensitive hierarchy.
 * Includes Jedi ranks, Sith ranks, and neutral Force users.
 */
const FORCE_SENSITIVE_HIERARCHY = {
    Jedi: [
        { id: "YOUNGLING", label: "Youngling" },
        { id: "PADAWAN", label: "Padawan" },
        { id: "KNIGHT", label: "Knight" },
        { id: "MASTER", label: "Master" },
    ],
    Sith: [
        { id: "APPRENTICE", label: "Apprentice" },
        { id: "LORD", label: "Lord" },
    ],
    Neutral: [
        { id: "FORCE_ADEPT", label: "Force Adept" },
        { id: "WHILLS_GUARDIAN", label: "Guardian of the Whills" },
        { id: "UNAFFILIATED", label: "Unaffiliated Sensitive" },
    ],
};
/**
 * Droid hierarchy.
 * Categorizes droids by their primary function.
 */
const DROID_HIERARCHY = {
    Type: [
        { id: "ASTROMECH", label: "Astromech" },
        { id: "PROTOCOL", label: "Protocol" },
        { id: "BATTLE", label: "Battle" },
        { id: "MEDICAL", label: "Medical" },
        { id: "ASSASSIN", label: "Assassin" },
        { id: "SECURITY", label: "Security" },
        { id: "PILOT", label: "Pilot" },
    ],
};
/**
 * Organic Personnel hierarchy.
 * Covers non-Force-sensitive living characters.
 */
const ORGANIC_PERSONNEL_HIERARCHY = {
    Type: [
        { id: "REBEL_OPERATIVES", label: "Rebel Operatives / Spies" },
        { id: "IMPERIAL_OFFICERS", label: "Imperial Officers" },
        { id: "PRISONERS", label: "Prisoners / Laborers" },
        { id: "CIVILIANS", label: "Civilians / Workers" },
        { id: "SOLDIERS", label: "Soldiers" },
        { id: "PILOTS", label: "Pilots" },
    ],
};
/**
 * Cyborg hierarchy.
 * For characters with significant technological augmentation.
 */
const CYBORG_HIERARCHY = {
    Type: [
        { id: "TECHNOLOGICALLY_AUGMENTED", label: "Technologically-Augmented" },
    ],
};
/**
 * Non-Combat Role hierarchy.
 * For characters primarily in political, diplomatic, or support roles.
 */
const NON_COMBAT_ROLE_HIERARCHY = {
    Type: [
        { id: "POLITICIANS", label: "Politicians" },
        { id: "DIPLOMATS", label: "Diplomats" },
        { id: "INTELLIGENCE", label: "Intelligence" },
        { id: "FAMILY_SUPPORT", label: "Family or Support" },
        { id: "BUREAUCRATS", label: "Bureaucrats" },
    ],
};
/**
 * Force-Sensitive designation.
 * The highest tier, representing those who can use the Force.
 */
const ForceSensitive = {
    name: "Force-Sensitive",
    hierarchy: FORCE_SENSITIVE_HIERARCHY,
    examples: {
        YOUNGLING: ["Grogu"],
        PADAWAN: ["Anakin Skywalker", "Obi-Wan Kenobi"],
        KNIGHT: ["Luke Skywalker"],
        MASTER: ["Yoda"],
        APPRENTICE: ["Darth Maul"],
        LORD: ["Darth Vader"],
        FORCE_ADEPT: ["Chirrut Imwe"],
    },
};
/**
 * Droids designation.
 * Mechanical beings serving various functions.
 */
const Droids = {
    name: "Droids",
    hierarchy: DROID_HIERARCHY,
    examples: {
        ASTROMECH: ["R2-D2", "R4-P17"],
        PROTOCOL: ["C-3PO"],
        BATTLE: ["B1 Battle Droid", "B2 Super Battle Droid", "Droideka"],
        MEDICAL: ["2-1B", "FX-7"],
        SECURITY: ["IG-88", "IG-11"],
        PILOT: ["K-2SO", "IG-100 Magnaguard"],
    },
};
/**
 * Organic Personnel designation.
 * Living beings in various roles throughout the galaxy.
 */
const OrganicPersonnel = {
    name: "Organic Personnel",
    hierarchy: ORGANIC_PERSONNEL_HIERARCHY,
    examples: {
        REBEL_OPERATIVES: [
            "Cassian Andor",
            "Luthen Rael",
            "Kleya Marki",
            "Vel Sartha",
            "Cinta Kaz",
            "Karis Nemik",
            "Ruescott Melshi",
            "Saw Gerrera",
            "Mon Mothma",
        ],
        IMPERIAL_OFFICERS: [
            "Dedra Meero",
            "Syril Karn",
            "Major Lio Partagaz",
            "Orson Krennic",
            "Lieutenant Gorn",
            "Sergeant Linus Mosk",
        ],
        PRISONERS: [
            "Kino Loy",
            "Wilmon Paak",
        ],
        CIVILIANS: [
            "Maarva Andor",
            "Brasso",
            "Bix Caleen",
            "Clem Andor",
        ],
        SOLDIERS: [],
        PILOTS: [],
    },
};
/**
 * Cyborgs designation.
 * Beings that are part organic, part machine.
 */
const Cyborgs = {
    name: "Cyborgs",
    hierarchy: CYBORG_HIERARCHY,
    examples: {
        TECHNOLOGICALLY_AUGMENTED: ["General Grievous"],
    },
};
/**
 * Non-Combat Roles designation.
 * Characters who operate primarily outside of direct combat.
 */
const NonCombatRoles = {
    name: "Non-Combat Roles",
    hierarchy: NON_COMBAT_ROLE_HIERARCHY,
    examples: {
        POLITICIANS: ["Padme Amidala", "Mon Mothma", "Bail Organa"],
        DIPLOMATS: ["Bail Organa", "Mon Mothma"],
        INTELLIGENCE: ["Luthen Rael", "Kleya Marki", "Lonni Jung", "General Draven"],
        FAMILY_SUPPORT: ["Maarva Andor", "Eedy Karn"],
        BUREAUCRATS: ["Dedra Meero", "Major Lio Partagaz", "Syril Karn"],
    },
};
/**
 * All designations in the system.
 * Used for generating the markdown reference and validating results.
 */
export const ALL_DESIGNATIONS = [
    ForceSensitive,
    Droids,
    OrganicPersonnel,
    Cyborgs,
    NonCombatRoles,
];
/**
 * Generates a markdown document from the list of designations.
 * This markdown is sent to Claude as a reference for classification.
 *
 * @param designations - The list of designations to convert to markdown.
 * @returns A markdown string describing all designations and their hierarchies.
 */
function createMarkdown(designations) {
    let markdown = "";
    for (const designation of designations) {
        markdown += `## Name\n**${designation.name}**\n\n`;
        markdown += `---\n`;
        // Hierarchy section
        markdown += `## Hierarchy\n`;
        for (const [groupName, ranks] of Object.entries(designation.hierarchy)) {
            if (groupName) {
                markdown += `### ${groupName}\n`;
            }
            for (const rank of ranks) {
                markdown += `- ${rank.label} \`(${rank.id})\`\n`;
            }
        }
        markdown += `\n---\n`;
        // Examples section
        markdown += `## Examples\n`;
        for (const [rankId, people] of Object.entries(designation.examples)) {
            if (!people || people.length === 0) {
                continue;
            }
            markdown += `### ${rankId}\n`;
            for (const person of people) {
                markdown += `- ${person}\n`;
            }
        }
        markdown += `\n---\n\n`;
    }
    return markdown;
}
/**
 * Pre-generated markdown for all Star Wars designations.
 * This is embedded in Claude prompts for classification reference.
 */
export const starWarsDesignationsMarkdown = createMarkdown(ALL_DESIGNATIONS);
