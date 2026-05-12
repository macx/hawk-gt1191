import { execSync } from 'child_process'

export function remarkModifiedTime() {
  return function (tree, file) {
    if (typeof tree === 'undefined') throw new Error('Missing tree')

    const filepath = file.history[0]

    try {
      const result = execSync(
        `git log -1 --format=%cd --date=short -- "${filepath}"`
      )
      file.data.astro.frontmatter.lastModified = result.toString().trim()
    } catch {
      const pubDate = file.data?.astro?.frontmatter?.pubDate
      const fallbackDate = pubDate
        ? new Date(pubDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10)

      file.data.astro.frontmatter.lastModified = fallbackDate
    }
  }
}
