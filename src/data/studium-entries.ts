type StudiumPage = {
  url: string
  default?: {
    url?: string
    frontmatter?: {
      title?: string
      description?: string
      heroImage?: string
    }
  }
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
export const seminarplan = pages['../pages/studium/seminarplan.mdx']

export const entries = [
  {
    key: 'starterkit',
    page: starterkit,
    cta: 'Zum Starterkit',
    fallback: {
      url: '/studium/starterkit',
      title: 'Das Website-Starterkit',
      description:
        'Erstelle mit dem Starterkit innerhalb von Sekunden eine neue Website. So bleibt dir mehr Zeit zum Lernen.',
      heroImage: '/src/images/pages/terminal-starterkit.png'
    }
  },
  {
    key: 'seminarplan',
    page: seminarplan,
    cta: 'Zum Seminarplan',
    fallback: {
      url: '/studium/seminarplan',
      title: 'Seminarplan',
      description:
        'Alle Seminare im Semester mit Ort, Kurzinfo und direkten Links zu Aufzeichnungen und Dateien.',
      heroImage: '/src/images/pages/laptop-ide-rocket.png'
    }
  },
  {
    key: 'abgabe',
    page: abgabe,
    cta: 'Zur Abgabeübersicht',
    fallback: {
      url: '/studium/abgabe',
      title: 'Abgabe und Anforderungen',
      description:
        'Hier findest du alles, was du für einen erfolgreichen Abschluss deines Projekts wissen musst. Nutze diese Seite als interaktiven Leitfaden für deine Website-Abgabe.',
      heroImage: '/src/images/pages/laptop-website-rocket.png'
    }
  }
]
  .filter((entry) => entry.page)
  .map((entry) => {
    const frontmatter =
      entry.page.frontmatter ?? entry.page.default?.frontmatter

    return {
      ...entry,
      url: entry.page.url ?? entry.page.default?.url ?? entry.fallback.url,
      title: frontmatter?.title ?? entry.fallback.title,
      description: frontmatter?.description ?? entry.fallback.description,
      heroImage: frontmatter?.heroImage ?? entry.fallback.heroImage
    }
  })
