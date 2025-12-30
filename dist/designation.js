// REGION: Hierarchies
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
const CYBORG_HIERARCHY = {
    Type: [
        { id: "TECHNOLOGICALLY_AUGMENTED", label: "Technologically-Augmented" },
    ],
};
const NON_COMBAT_ROLE_HIERARCHY = {
    Type: [
        { id: "POLITICIANS", label: "Politicians" },
        { id: "DIPLOMATS", label: "Diplomats" },
        { id: "INTELLIGENCE", label: "Intelligence" },
        { id: "FAMILY_SUPPORT", label: "Family or Support" },
        { id: "BUREAUCRATS", label: "Bureaucrats" },
    ],
};
// REGION: Designations
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
        FORCE_ADEPT: ["Chirrut Îmwe"],
    },
};
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
const Cyborgs = {
    name: "Cyborgs",
    hierarchy: CYBORG_HIERARCHY,
    examples: { TECHNOLOGICALLY_AUGMENTED: ["General Grievous"] },
};
const NonCombatRoles = {
    name: "Non-Combat Roles",
    hierarchy: NON_COMBAT_ROLE_HIERARCHY,
    examples: {
        POLITICIANS: ["Padmé Amidala", "Mon Mothma", "Bail Organa"],
        DIPLOMATS: ["Bail Organa", "Mon Mothma"],
        INTELLIGENCE: ["Luthen Rael", "Kleya Marki", "Lonni Jung", "General Draven"],
        FAMILY_SUPPORT: ["Maarva Andor", "Eedy Karn"],
        BUREAUCRATS: ["Dedra Meero", "Major Lio Partagaz", "Syril Karn"],
    },
};
export const ALL_DESIGNATIONS = [
    ForceSensitive,
    Droids,
    OrganicPersonnel,
    Cyborgs,
    NonCombatRoles,
];
function createMarkdown(designations) {
    let markdown = "";
    for (const designation of designations) {
        markdown += `## Name\n**${designation.name}**\n\n`;
        markdown += `---\n`;
        // Hierarchy
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
        // Examples
        markdown += `## Examples\n`;
        for (const [rankId, people] of Object.entries(designation.examples)) {
            if (!people || people.length === 0)
                continue;
            markdown += `### ${rankId}\n`;
            for (const person of people) {
                markdown += `- ${person}\n`;
            }
        }
        markdown += `\n---\n\n`;
    }
    return markdown;
}
export const starWarsDesignationsMarkdown = createMarkdown(ALL_DESIGNATIONS);
