import { defineCollection, reference, z } from 'astro:content'

const tutorials = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      isDraft: z.boolean(),
      author: reference('authors'),
      pubDate: z.coerce.date(),
      updateDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image().refine((img) => img.width >= 1000, {
            message: 'Hero image must be at least 1000 pixels wide'
          }),
          alt: z.string(),
          caption: z.string().or(z.boolean()).optional()
        })
        .optional(),
      tags: z.array(z.string()).optional(),
      headings: z.array(z.string()).optional(),
      relatedPosts: z.array(reference('tutorials')).optional()
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

export const collections = {
  tutorials: tutorials,
  authors: authors
}
