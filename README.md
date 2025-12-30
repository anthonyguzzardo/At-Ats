# AT-ATs
## *A Star Wars Themed Applicant Tracking System*

**Current stage:** The tool primarily evaluates resume quality by scanning and comparing PDF resumes against a Markdown version.

## How it Works
- Upload your resume (must be a PDF)
- Assigned a Star Wars character based on resume quality using LLM scoring system
- Your result places you in one of several thematic categories (users only see the final Star Wars ranking, not a numerical score)

## Ranking Categories

The system assigns your resume to a Star Wars-inspired category, reflecting its overall strength and fit.

```
Force-Sensitive
├─ Jedi  
│ ├─ Youngling  
│ ├─ Padawan  
│ ├─ Knight  
│ └─ Master  
├─ Sith  
│ ├─ Apprentice  
│ └─ Lord  
└─ Light/Neutral (Non-Jedi)  
   ├─ Force Adepts  
   └─ Unaffiliated Sensitives  

Droids
├─ Astromech  
├─ Protocol  
├─ Medical  
├─ Battle  
├─ Assassin  
└─ Security  

Organic Personnel
├─ Rebel Operatives / Spies  
├─ Imperial Offices  
├─ Civilians / Workers  
├─ Soldiers  
├─ Pilots 
└─ Prisoners / Laborers  

Cyborgs
└─ Technologically-Augmented  

Non-Combat Roles
├─ Politicians  
├─ Diplomats  
├─ Intelligence  
├─ Family or Support  
└─ Criminal Organizations  
```
**Note:** The Dark Side represents a way of using the Force — all Sith use the Dark Side, but not all Dark Side users are Sith.

## Quick Examples (to illustrate the theme)

- **Jedi Master** → Yoda, Mace Windu  
- **Jedi Knight** → Obi-Wan Kenobi, Luke Skywalker  
- **Sith Lord** → Darth Sidious (Palpatine)  
- **Astromech Droid** → R2-D2 
- **Protocol Droid** → C-3PO  
- **Battle Droid** → Droidekas  
- **Cyborg** → General Grevious
- **Non-Combat Politician** → Padmé Amidala  

Higher Force-sensitive ranks (especially Jedi Master) generally indicate stronger, better-optimized resumes. Lower or non-Force categories suggest room for improvement in formatting, clarity, or content.