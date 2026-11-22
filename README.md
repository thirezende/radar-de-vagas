# Radar de Vagas

A personal job-search engine. Every morning it collects marketing leadership openings, reads each one, scores how well it fits my career, and lets me download a cover letter and CV tailored to that specific job in under a minute.

I built it because job boards optimize for volume, not fit. I wanted fewer, better applications, each one written for the job in front of me, and none that claims something I can't back up in an interview.

## How it works

1. **Collect.** A scheduled AI run reads my job-alert emails (LinkedIn, Indeed, Gupy, Sólides), searches career pages and recruiters, and confirms which applications I already sent.
2. **Read before scoring.** No job gets a score until its full description has been read. If it can't be found anywhere, the job is flagged as unread and capped at 70.
3. **Score from 0 to 100** on six criteria I defined (see [criteria.md](criteria.md)): function, seniority, location, requirements, sector and freshness.
4. **Apply the central-gap rule.** If a job is built around something I can't prove with delivered work, it only stays in the queue when everything else fits at least 80%. Otherwise it is discarded, with the reason written down.
5. **Show it in a portal** where I sort, discard (the reasons feed the next day's search) and track each application from "applied" to "offer".
6. **Generate the kit on click.** One button sends the job description and my verified career facts to Claude, which writes the cover letter and adjusts the CV to the job's keywords. The page then builds a text-based, single-column PDF that ATS systems can read ([kit-pdf.js](kit-pdf.js)).

## Rules the AI has to follow

- Only facts from my verified career base go into a letter or CV. No invented numbers, tools, clients or titles.
- Job keywords are used only where they are true for me.
- Letters open with "Bom dia," or "Dear hiring team," and follow my tone of voice ([tom-de-voz-ia](https://github.com/thirezende/tom-de-voz-ia)).
- Titles, companies and dates come straight from the career base, never from the model.
- It never applies, messages recruiters or types passwords on my behalf.

## What is in this repository

| File | What it is |
|---|---|
| `criteria.md` | Scoring criteria, salary flags and the central-gap rule |
| `kit-prompt.md` | The instructions the model receives to write each kit |
| `kit-pdf.js` | Dependency-free PDF generator (real text, Helvetica, A4, letter fitted to page 1) |

My personal data and career base are not published here.

## Built with

Claude (Anthropic) for the scheduled runs, the scoring and the writing; a Claude artifact for the portal and its database; Gmail and Google Drive connectors. I defined the problem, the criteria, the rules and the voice; Claude wrote most of the code.
