import { defineCollection, reference, z } from 'astro:content'

const tutorials = defineCollection({
  type: 'content',
  schema: ({}) =>
    z.object({
      title: z.string(),
      description: z.string(),
      isDraft: z.boolean(),
      author: reference('authors'),
      pubDate: z.coerce.date(),
      updateDate: z.coerce.date().optional(),
      cover: z
        .object({
          path: z.string(),
          alt: z.string(),
          caption: z.string().or(z.boolean()).optional()
        })
        .optional(),
      tags: z.array(z.string()).optional(),
      headings: z.array(z.string()).optional(),
      relatedPosts: z.array(reference('tutorials')).optional(),
      layout: z.string().optional(),
      readingTime: z
        .object({
          minutes: z.number(),
          words: z.number()
        })
        .optional()
    })
})

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    threads: z.string().optional()
  })
})

const learningPaths = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    path: z.string(),
    description: z.string(),
    tutorialSlugs: z.array(z.string())
  })
})

export const collections = {
  tutorials: tutorials,
  authors: authors,
  learningPaths: learningPaths
}
