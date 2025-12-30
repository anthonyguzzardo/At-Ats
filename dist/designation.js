// STATIC
const Designations = [
    "Force-Sensitive",
    "Droids",
    "Organic Personnel",
    "Cyborgs",
    "Non-Combat Roles"
];
const ForceSensitive = {
    name: "Force-Sensitive",
    hierarchy: {
        "Jedi": ["Youngling", "Padawan", "Knight", "Master"],
        "Sith": ["Apprentice", "Lord"],
        "Dark Side": ["Inquisitorius", "Nightsisters", "Acolytes"],
        "Light/Nuetral": ["Force Adepts", "Unaffiliated Sensitives"]
    },
    examples: {
        "Jedi Youngling": ["Grogu"],
        "Jedi Knight": ["Obi-Wan Kenobi", "Anakin Skywalker"],
        "Jedi Master": ["Yoda", "Mace Windu"],
        "Sith Lord": ["Darth Vader", "Darth Sidious"],
    },
};
const DROIDS = {
    name: "Force-Sensitive",
    hierarchy: {
        "Jedi": ["Youngling", "Padawan", "Knight", "Master"],
        "Sith": ["Apprentice", "Lord"],
        "Dark Side": ["Inquisitorius", "Nightsisters", "Acolytes"],
        "Light/Nuetral": ["Force Adepts", "Unaffiliated Sensitives"]
    },
    examples: {
        "Jedi Youngling": ["Grogu"],
        "Jedi Knight": ["Obi-Wan Kenobi", "Anakin Skywalker"],
        "Jedi Master": ["Yoda", "Mace Windu"],
        "Sith Lord": ["Darth Vader", "Darth Sidious"],
    },
};
const OrganicPersonnel = {
    name: "Organic Personnel",
    hierarchy: {
        "": [
            "Rebel Operatives/Spies",
            "Imperial Officers",
            "Prisoners/Laborers",
            "Civilians/Workers",
            "Soldiers",
            "Pilots",
        ],
    },
    examples: {
        "Rebel Operatives/Spies": [
            "Cassian Andor",
            "Vel Sartha",
            "Cinta Kaz",
            "Luthen Rael",
            "Kleya Marki",
            "Tay Kolma",
            "Lonni Jung",
            "Karis Nemik",
            "Taramyn Barcona",
            "Arvel Skeen",
            "Ruescott Melshi",
            "Saw Gerrera",
            "Bix Caleen",
            "Mon Mothma", // also political, but very active in rebellion ops
        ],
        "Imperial Officers": [
            "Dedra Meero",
            "Syril Karn",
            "Major Lio Partagaz",
            "Orson Krennic",
            "Lieutenant Gorn",
            "Sergeant Linus Mosk",
            "Commandant Jayhold Beehaz",
            "Chief Hyne",
            "Captain Kaido",
            "Blevin",
        ],
        "Prisoners/Laborers": [
            "Kino Loy",
            "Wilmon Paak",
        ],
        "Civilians/Workers": [
            "Brasso",
            "Maarva Andor",
            "Clem Andor",
            "Timm Karlo",
            "Bix Caleen",
        ],
    },
};
const Cyborgs = {
    name: "Force-Sensitive",
    hierarchy: {
        "Jedi": ["Youngling", "Padawan", "Knight", "Master"],
        "Sith": ["Apprentice", "Lord"],
        "Dark Side": ["Inquisitorius", "Nightsisters", "Acolytes"],
        "Light/Nuetral": ["Force Adepts", "Unaffiliated Sensitives"]
    },
    examples: {
        "Jedi Youngling": ["Grogu"],
        "Jedi Knight": ["Obi-Wan Kenobi", "Anakin Skywalker"],
        "Jedi Master": ["Yoda", "Mace Windu"],
        "Sith Lord": ["Darth Vader", "Darth Sidious"],
    },
};
const NonCombatRoles = {
    name: "Non-Combat Roles",
    hierarchy: {
        "": [
            "Politicians",
            "Diplomats",
            "Intelligence/Spies",
            "Criminal Organizations",
            "Family/Support",
            "Bureaucrats",
        ],
    },
    examples: {
        "Politicians": [
            "Padmé Amidala",
            "Mon Mothma",
            "Bail Organa",
            "Perrin Fertha",
            "Davo Sculdun",
        ],
        "Diplomats": [
            "Bail Organa",
            "Mon Mothma",
        ],
        "Intelligence/Spies": [
            "Luthen Rael",
            "Kleya Marki",
            "Lonni Jung",
            "General Draven",
        ],
        "Criminal Organizations": [
            "Jabba the Hutt",
            "Qi'ra",
        ],
        "Family/Support": [
            "Eedy Karn",
            "Maarva Andor",
        ],
        "Bureaucrats": [
            "Major Lio Partagaz",
            "Dedra Meero",
            "Syril Karn",
        ],
    },
};
export {};
