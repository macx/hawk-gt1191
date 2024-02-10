import { execSync } from 'child_process'

export function remarkModifiedTime() {
  return function (tree, file) {
    if (typeof tree === 'undefined') throw new Error('Missing tree')

    const filepath = file.history[0]
    const result = execSync(`git log -1 --format=%cd --date=short ${filepath}`)
    file.data.astro.frontmatter.lastModified = result.toString().trim()
  }
}
