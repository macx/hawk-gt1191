export interface siteConfig {
  site: string
  title: string
  description: string
  links: { [key: string]: string }
}

export const SITE_CONST: siteConfig = {
  site: 'https://hawk-gt1191.de',
  title: 'HAWK GT 1191',
  description:
    'Lerne im Seminar GT 1191, wie du Websites mit HTML, CSS und guter UI/UX erstellst.',
  links: {
    studip:
      'https://studip.hawk.de/dispatch.php/course/overview?cid=a7139a7637944253e742f446f2fde6e1',
    discord: 'https://discord.gg/Kke2BsapYu',
    github: 'https://github.com/hawk-gt1191'
  }
}

export interface TagAbbrevation {
  [key: string]: string
}

const tagAbbrevations: TagAbbrevation = {
  html: 'HTML',
  css: 'CSS',
  sass: 'Sass',
  js: 'JavaScript',
  ts: 'TypeScript',
  socialmedia: 'Social Media',
  showcase: 'Showcase',
  images: 'Bilder',
  typografie: 'Typografie',
  webfonts: 'Webfonts',
  zeichen: 'Zeichen',
  historie: 'Historie'
}

export function getTagLongform(tag: string): string {
  return tagAbbrevations[tag] || tag
}
