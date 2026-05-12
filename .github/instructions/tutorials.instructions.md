---
description: 'Use when writing or revising tutorials in src/data/tutorials. Covers tutorial tone, didactic structure, frontmatter quality, figure/snippet integration, and wording for headings/descriptions.'
name: 'Tutorial Writing Conventions'
applyTo: 'src/data/tutorials/**/*.mdx'
---

# Tutorial Writing Conventions

## Audience and Tone

- Write for students: clear, direct, and practical.
- Explain new concepts simply first, then connect them to concrete code.
- Avoid unnecessarily abstract phrasing.

## Language Policy

- Keep assistant replies and tutorial prose in German.
- Use proper German umlauts in prose.
- Do not use umlauts in identifiers (variables, classes, IDs, functions, file names).

## Structure

- Use H2 for major sections and H3 for subtopics.
- Keep sections compact and focused.
- Add 1-2 lead-in sentences before code examples.

## Title and Description

- Prefer strong eyebrow-headline combinations in a YouTube-style tone.
- Description should clearly communicate value and outcome without buzzword filler.
- Avoid weak phrasing such as "Eine Einführung" when a concrete value statement is possible.

## Figures and Demo Code

- In demo sections, keep relevant code visible in the figure context.
- When interactivity is explained, keep state naming consistent across prose, HTML, CSS, and JS.
- Use human-readable link labels; do not show raw paths as labels.

## Frontmatter Quality

- Verify `title`, `description`, `cover.alt`, and `cover.caption` against the actual content and image.
- Alt text should describe the real image content precisely, without marketing fluff.
- Caption should add didactic context instead of repeating the image description.

## Final Check

- Run spelling and grammar checks.
- Keep terminology and state names consistent across the tutorial.
- Validate didactic flow: problem -> explanation -> code -> application/exercise.
