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
- When documenting CSS specificity, use hyphen notation (`0-1-0`) instead of comma notation (`0,1,0`).

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

## Didactic Best Practices

### Structure & Order

- **News-Style Over Complexity Pyramid**: Present strategies by impact, not entry difficulty. Learners want to understand _why_ something matters first. "Most important first" works better than "simple → complex".
- **Recognize Didactic Dependencies**: If Concept B depends on A (e.g., @scope requires understanding specificity), place A _before_ B, even if A seems harder. Correct order prevents "but why?" questions.
- **Build Mental Models Explicitly**: Follow the pattern: Problem → Concept Explanation → Code Example → Differentiation. When comparing (Nesting vs @scope), clarify _real_ differences (specificity, not syntax).
- **Link Repeated Concepts with Context**: Instead of "as shown in Point 3", write: "The code from Point 2 with components can be optimized further...". This keeps readers in the narrative flow.

### Terminology & Precision

- **Use Terminology Consistently**: Mixing "Aufgabe", "Verantwortung", and "Verantwortlichkeiten" confuses readers. Choose one term (e.g., "Zuständigkeit") and apply it throughout — including in figure captions and section titles.
- **Name Concepts First, Then Show Practically**: Lead with the principle: "The DRY principle — 'Don't Repeat Yourself' — means...". Then show the practical application (components, examples). Titles should reflect this: "The DRY Principle: Components Over Pages" not just "Components Over Pages".
- **Use Definition Lists for Bonus Tips**: Definition lists (using `: explanation`) structure bonus sections better than bullet points. They create clear visual hierarchy between concept and explanation.

### Cover Images (Frontmatter)

- **YouTube-Thumbnail Style for Impact**: Use large, high-contrast numbers/headlines + optional engaged person + clean background. Avoid busy checklists — keep it punchy and instantly recognizable even at thumbnail size.
- **Concise Alt Text & Captions**: Alt text should describe the visual ("enthusiastic woman presenting with code editor in background"). Caption should communicate the learning outcome ("10 Pro Strategies for Clean CSS").

### Quality Assurance

- **Targeted Spelling Checks**: At the end, grep for common typos and apply fixes systematically across the file.
- **Consistency Passes Before Publish**: Scan all section numbers, all cross-references, and all terminology. Small inconsistencies feel unprofessional.

## Project Context

- Tutorial files: `src/data/tutorials/*.mdx`
- Learning paths: `src/data/learningpaths/*.json`
- Demo snippets: `src/snippets/**`
- Figure component: `src/components/Figure.astro`
- Snippet component: `src/components/Snippet.astro`
