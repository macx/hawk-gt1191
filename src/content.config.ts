import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/data/tutorials' }),
  schema: () =>
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
  loader: glob({ pattern: '**/[^_]*.json', base: './src/data/authors' }),
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    threads: z.string().optional()
  })
})

const learningPaths = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.json',
    base: './src/data/learningpaths'
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    path: z.string(),
    description: z.string(),
    order: z.number(),
    related: z.array(z.string())
  })
})

export const collections = {
  tutorials,
  authors,
  learningPaths
}
