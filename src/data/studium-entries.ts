type StudiumPage = {
  url: string
  frontmatter?: {
    title?: string
    description?: string
    heroImage?: string
  }
}

const pages = import.meta.glob<StudiumPage>('../pages/studium/*.mdx', {
  eager: true
})

export const starterkit = pages['../pages/studium/starterkit.mdx']
export const abgabe = pages['../pages/studium/abgabe.mdx']

export const entries = [
  { key: 'starterkit', page: starterkit, cta: 'Zum Starterkit' },
  { key: 'abgabe', page: abgabe, cta: 'Zur Abgabeübersicht' }
]
  .filter((entry) => entry.page)
  .map((entry) => ({
    ...entry,
    url: entry.page.url,
    title: entry.page.frontmatter?.title,
    description: entry.page.frontmatter?.description,
    heroImage: entry.page.frontmatter?.heroImage
  }))
