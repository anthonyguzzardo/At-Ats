const ForceSensitive = {
    name: "Force-Sensitive",
    hierarchy: {
        "Jedi": ["Youngling", "Padawan", "Knight", "Master"],
        "Sith": ["Apprentice", "Lord"],
        "Dark Side": ["Inquisitorius", "Nightsisters", "Acolytes"],
        "Light/Neutral": ["Force Adepts", "Unaffiliated Sensitives", "Guardians of the Whills"],
    },
    examples: {
        "Jedi Youngling": ["Grogu"],
        "Jedi Padawan": ["Ahsoka Tano (early)", "Anakin Skywalker (pre-Knight)"],
        "Jedi Knight": ["Obi-Wan Kenobi", "Anakin Skywalker", "Luke Skywalker"],
        "Jedi Master": ["Yoda", "Mace Windu", "Qui-Gon Jinn"],
        "Sith Apprentice": ["Darth Maul", "Count Dooku"],
        "Sith Lord": ["Darth Sidious (Palpatine)", "Darth Vader"],
        "Inquisitorius": ["Grand Inquisitor", "Second Sister"],
        "Nightsisters": ["Mother Talzin", "Asajj Ventress"],
        "Force Adept": ["Chirrut Îmwe", "Bendu"],
        "Unaffiliated Sensitive": ["The Child (Grogu, later)"],
    },
};
const Droids = {
    name: "Droids",
    hierarchy: {
        "": ["Astromech", "Protocol", "Battle", "Medical", "Assassin", "Security"],
    },
    examples: {
        "Astromech": ["R2-D2", "BB-8", "R5-D4", "Chopper (C1-10P)"],
        "Protocol": ["C-3PO"],
        "Battle": ["B1 Battle Droid", "Droideka", "Super Battle Droid"],
        "Medical": ["2-1B", "FX-7"],
        "Assassin": ["IG-11", "IG-88"],
        "Security": ["K-2SO"],
    },
};
const OrganicPersonnel = {
    name: "Organic Personnel",
    hierarchy: {
        "": [
            "Rebel Operatives/Spies",
            "Imperial Officers",
            "Pilots",
            "Soldiers/Troopers",
            "Civilians/Workers",
            "Bounty Hunters",
        ],
    },
    examples: {
        "Rebel Operatives/Spies": [
            "Cassian Andor",
            "Jyn Erso",
            "Han Solo",
            "Luke Skywalker (early)",
            "Vel Sartha",
            "Cinta Kaz",
            "Luthen Rael",
            "Karis Nemik",
            "Saw Gerrera",
            "Bodhi Rook",
        ],
        "Imperial Officers": [
            "Grand Moff Tarkin",
            "Director Orson Krennic",
            "Admiral Motti",
            "General Tagge",
            "Dedra Meero",
            "Syril Karn",
            "Major Lio Partagaz",
        ],
        "Pilots": [
            "Wedge Antilles",
            "Poe Dameron (no - skip sequels)",
            "Biggs Darklighter",
            "Din Djarin (The Mandalorian)",
        ],
        "Soldiers/Troopers": [
            "Stormtroopers (various)",
            "Death Troopers",
            "Scout Troopers",
            "Clone Troopers (prequel era)",
        ],
        "Civilians/Workers": [
            "Owen Lars",
            "Beru Lars",
            "Greedo",
            "Peli Motto",
            "Bix Caleen",
            "Maarva Andor",
        ],
        "Bounty Hunters": [
            "Boba Fett",
            "Jango Fett",
            "Cad Bane (no cartoon)",
        ],
    },
};
const Cyborgs = {
    name: "Cyborgs",
    hierarchy: {
        "": ["Partial Cybernetics", "Heavy Cybernetics", "Full Conversion"],
    },
    examples: {
        "Partial Cybernetics": [
            "Darth Vader (life-support suit)",
            "Echo (Bad Batch - no cartoon heavy)",
            "Lobot (Cloud City)",
        ],
        "Heavy Cybernetics": [
            "General Grievous",
            "Darth Maul (cybernetic legs)",
        ],
        "Full Conversion": [
            "Lobot",
            "Some Imperial officers with enhancements",
        ],
    },
};
const NonCombatRoles = {
    name: "Non-Combat Roles",
    hierarchy: {
        "": ["Politicians", "Diplomats", "Intelligence/Spies", "Criminal Organizations", "Family/Support", "Bureaucrats"],
    },
    examples: {
        "Politicians": [
            "Padmé Amidala",
            "Queen/Senator Amidala",
            "Mon Mothma",
            "Bail Organa",
            "Princess Leia Organa",
        ],
        "Diplomats": [
            "Bail Organa",
            "Mon Mothma",
            "Leia Organa",
        ],
        "Intelligence/Spies": [
            "Luthen Rael",
            "Kleya Marki",
            "General Draven",
            "Lonni Jung",
        ],
        "Criminal Organizations": [
            "Jabba the Hutt",
            "Bib Fortuna",
            "Qi'ra (early Crimson Dawn)",
        ],
        "Family/Support": [
            "Shmi Skywalker",
            "Cliegg Lars",
            "Eedy Karn",
            "Maarva Andor",
        ],
        "Bureaucrats": [
            "Nute Gunray",
            "Rune Haako",
            "Poggle the Lesser",
        ],
    },
};
const BIG_FIVE_DESIGNATIONS = [
    ForceSensitive,
    Droids,
    OrganicPersonnel,
    Cyborgs,
    NonCombatRoles,
];
export {};
// HTML
// EVENT LISTENERS
// FUNCTIONS
