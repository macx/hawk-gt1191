---
name: tutorial-writing
description: 'Use for writing or revising tutorials in src/data/tutorials/*.mdx, creating new learning-path tutorial content, refining didactic flow, improving headings, frontmatter, demo explanations, and code examples. Trigger words: tutorial, lernpfad, mdx, figure, snippet, alt-text, caption, title, description, rechtschreibung.'
argument-hint: 'Task, topic, and target audience (for example: revise custom-properties tutorial for beginner students)'
user-invocable: true
---

# Tutorial Writing Skill

## Purpose

This skill standardizes how tutorials in this project are written and revised.
Use it for creating new tutorials and polishing existing MDX tutorials.

## Use When

- Creating a new tutorial in `src/data/tutorials/`.
- Revising an existing tutorial for language, didactics, or structure.
- Improving frontmatter fields such as title, description, cover alt text, and caption.
- Explaining interactive demo sections with matching code context.
- Adding or updating learning-path references.

## Language Policy

- Keep assistant replies and tutorial prose in German.
- Use proper German umlauts in prose.
- Do not use umlauts in identifiers (variables, classes, IDs, function names, file names).

## Style Rules

- Write clearly, didactically, and practically for students.
- Use heading hierarchy: H2 for major sections, H3 for subtopics.
- Prefer short, precise sections over long text blocks.
- Explain concepts simply first, then confirm with code.
- Use figure context for demo-related code where it improves understanding.

## Structure For New Tutorials

1. Create frontmatter: `title`, `description`, `isDraft`, `pubDate`, `author`, optional `cover`, `tags`.
2. Write the entry section: audience, value, and concise problem framing.
3. Structure the core: syntax, practical use cases, common pitfalls.
4. Explain interactive demo behavior: what toggles and what changes in CSS.
5. End with an exercise or transfer task.

## Revision Checklist

1. Check spelling and grammar.
2. Improve title and description for clarity and impact.
3. Keep terminology consistent (for example state names in prose, HTML, CSS, and JS).
4. Keep demo prose and demo code in sync.
5. Use human-readable link labels (not raw paths).
6. Align cover alt text and caption with the real image content.

## Project Context

- Tutorial files: `src/data/tutorials/*.mdx`
- Learning paths: `src/data/learningpaths/*.json`
- Demo snippets: `src/snippets/**`
- Figure component: `src/components/Figure.astro`
- Snippet component: `src/components/Snippet.astro`
