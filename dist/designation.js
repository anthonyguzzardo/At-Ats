// предупреж ... means warning 
// STATIC
const Designations = [
    "Force-Sensitive", "Droids", "Organic Personnel", "Cyborgs", "Non-Combat Roles",
];
const ForceSensitive = {
    name: "Force-Sensitive",
    hierarchy: {
        Jedi: ["Youngling", "Padawan", "Knight", "Master"],
        Sith: ["Apprentice", "Lord"],
        "Light / Neutral": ["Force Adepts", "Guardians of the Whills", "Unaffiliated Sensitives"],
    },
    examples: {
        "Jedi Youngling": ["Grogu"],
        "Jedi Padawan": ["Anakin Skywalker (pre-Knight)", "Obi-Wan Kenobi (pre-Knight)"],
        "Jedi Knight": ["Obi-Wan Kenobi", "Anakin Skywalker", "Luke Skywalker", "Qui-Gon Jinn"],
        "Jedi Master": ["Yoda", "Mace Windu", "Ki-Adi-Mundi", "Plo Koon"],
        "Sith Apprentice": ["Darth Maul", "Count Dooku"],
        "Sith Lord": ["Darth Sidious (Emperor Palpatine)", "Darth Vader"],
        "Force Adept": ["Chirrut Îmwe"],
        "Guardians of the Whills": ["Chirrut Îmwe", "Baze Malbus"],
    },
};
const Droids = {
    name: "Droids",
    hierarchy: { "": ["Astromech", "Protocol", "Battle", "Medical", "Assassin", "Security", "Pilot"] },
    examples: {
        Astromech: ["R2-D2", "R4-P17"],
        Protocol: ["C-3PO"],
        Battle: ["B1 Battle Droid", "B2 Super Battle Droid", "Droideka"],
        Medical: ["2-1B", "FX-7"],
        Assassin: ["IG-88", "IG-11"],
        Security: ["K-2SO", "IG-100 Magnaguard"],
    },
};
const OrganicPersonnel = {
    name: "Organic Personnel",
    hierarchy: {
        "": [
            "Rebel Operatives / Spies", "Imperial Officers", "Prisoners / Laborers",
            "Civilians / Workers", "Soldiers", "Pilots",
        ],
    },
    examples: {
        Rebel_Operatives_or_Spies: [
            "Cassian Andor", "Luthen Rael", "Kleya Marki", "Vel Sartha", "Cinta Kaz",
            "Karis Nemik", "Ruescott Melshi", "Saw Gerrera", "Mon Mothma",
        ],
        Imperial_Officers: [
            "Dedra Meero", "Syril Karn", "Major Lio Partagaz",
            "Orson Krennic", "Lieutenant Gorn", "Sergeant Linus Mosk",
        ],
        Prisoners_or_Laborers: ["Kino Loy", "Wilmon Paak"],
        Civilians_or_Workers: ["Maarva Andor", "Brasso", "Bix Caleen", "Clem Andor"],
    },
};
const Cyborgs = {
    name: "Cyborgs",
    hierarchy: { "": ["Technologically-Augmented"] },
    examples: { "Technologically-Augmented": ["General Grievous"] },
};
const NonCombatRoles = {
    name: "Non-Combat Roles",
    hierarchy: {
        "": ["Politicians", "Diplomats", "Intelligence", "Family or Support", "Bureaucrats"],
    },
    examples: {
        Politicians: ["Padmé Amidala", "Mon Mothma", "Bail Organa"],
        Diplomats: ["Bail Organa", "Mon Mothma"],
        Intelligence: ["Luthen Rael", "Kleya Marki", "Lonni Jung", "General Draven"],
        Family_or_Support: ["Maarva Andor", "Eedy Karn"],
        Bureaucrats: ["Dedra Meero", "Major Lio Partagaz", "Syril Karn"],
    },
};
export {};
