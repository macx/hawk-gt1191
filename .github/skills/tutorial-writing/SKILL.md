---
name: tutorial-writing
description: 'Use for writing or revising tutorials in src/data/tutorials/*.mdx, creating new learning-path tutorial content, refining didactic flow, improving headings, frontmatter, demo explanations, and code examples. Trigger words: tutorial, lernpfad, mdx, figure, snippet, alt-text, caption, title, description, rechtschreibung.'
argument-hint: 'Task, topic, and target audience (for example: revise custom-properties tutorial for beginner students)'
user-invocable: true
---

# Tutorial Writing Skill

## 1. Purpose & Scope

### Purpose

This skill standardizes how tutorials in this project are written and revised.
Use it for creating new tutorials and polishing existing MDX tutorials.

### Use When

- Creating a new tutorial in `src/data/tutorials/`.
- Revising an existing tutorial for language, didactics, or structure.
- Improving frontmatter fields such as title, description, cover alt text, and caption.
- Explaining interactive demo sections with matching code context.
- Adding or updating learning-path references.

## 2. Foundation & Context

### Language & Terminology Policy

- Keep this skill text and internal instructions in English for maximum model reliability.
- Keep assistant replies and tutorial prose in German.
- Use proper German umlauts (ä, ö, ü, ß) in prose.
- Do NOT use umlauts in identifiers: variables, classes, IDs, function names, file names must be ASCII.
- Choose one term for a concept and apply it consistently throughout (for example: "Zuständigkeit" not "Aufgabe"/"Verantwortung"/"Verantwortlichkeiten").

### Hard Language Rules

- Always respond to the user in German.
- Always write tutorial body text in German.
- Keep instruction files and skill rules in English unless the user explicitly requests otherwise.

### Project File Structure

- Tutorial files: `src/data/tutorials/*.mdx`
- Learning paths: `src/data/learningpaths/*.json`
- Demo snippets: `src/snippets/**`
- Figure component: `src/components/Figure.astro`
- Snippet component: `src/components/Snippet.astro`

## 3. Writing Standards

### Tone & Style

- Write clearly, didactically, and practically for students.
- Explain concepts simply first, then confirm with code.
- Use heading hierarchy: H2 for major sections, H3 for subtopics.
- Prefer short, precise sections over long text blocks.

### Code & Demo Context

- Use figure context for demo-related code where it improves understanding.
- Keep demo prose and demo code in sync.
- Use human-readable link labels (not raw file paths).
- When documenting CSS specificity, use hyphen notation (`0-1-0`) instead of comma notation (`0,1,0`).

### Technical Notation Examples

- CSS specificity: `0-1-0` (not `0,1,0`)
- File links: "Learn more in [Custom Properties tutorial](/tutorials/css-custom-properties-variablen)" (not just a raw path)
- Code samples: include a `title` attribute with file path context

## 4. Frontmatter & Metadata

### Required Fields

Create frontmatter with these fields:

- `title`: compelling, benefit-driven headline
- `description`: 1-2 sentences, searchable keywords
- `isDraft`: set to `false` when ready for publication
- `pubDate`: ISO format date
- `author`: author identifier
- `tags`: array of relevant keywords
- `cover`: optional path and alt text object

### Cover Image Guidelines

- YouTube-thumbnail style: use large, high-contrast numbers/headlines, optional engaged person, and clean background.
- Avoid busy checklist layouts. Keep it punchy and recognizable at thumbnail size.
- Alt text describes visuals literally.
- Caption communicates learning outcome, not image type.

### Title & Description Optimization

- Lead with principle, then application in titles.
- Include problem and promise in descriptions.

## 5. Tutorial Structure

### For New Tutorials (5-Step Framework)

1. Frontmatter: `title`, `description`, `isDraft`, `pubDate`, `author`, optional `cover`, `tags`.
2. Entry section: audience, value proposition, concise problem framing.
3. Core content: syntax, practical use cases, common pitfalls.
4. Interactive demo: explain what toggles and what changes in CSS.
5. Transfer task: end with an exercise or transfer task.

### Didactic Flow & Ordering

- News-style over complexity pyramid: present strategies by impact first.
- Recognize didactic dependencies: place prerequisite concepts before dependent ones.
- Build mental models explicitly: Problem -> Concept -> Example -> Differentiation.
- Link repeated concepts with context, not just point numbers.

### Structural Patterns For Bonus Sections

- Use definition lists (`: explanation`) for bonus tips when concept + explanation hierarchy matters.

## 6. Quality Assurance & Revision

### Revision Checklist (In Order)

1. Check spelling and grammar.
2. Improve title and description for clarity and impact.
3. Keep terminology consistent in prose, headings, and captions.
4. Keep demo prose and demo code in sync.
5. Use human-readable link labels (not raw paths).
6. Align cover alt text and caption with actual image content.

### Consistency Pass (Final Check)

Before publishing, verify:

- section numbers and cross-references are correct
- terminology is consistently applied
- code samples include `title` attributes with path context
- figure captions are outcome-focused
- no orphaned or broken internal links
