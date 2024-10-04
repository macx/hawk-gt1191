export interface siteConfig {
  site: string
  title: string
  description: string
  links: { [key: string]: string }
}

export const SITE_CONST: siteConfig = {
  site: 'https://hawk-gt1191.de',
  title: 'HAWK GT 1191',
  description: 'Seminar an der HAWK',
  links: {
    studip:
      'https://studip.hawk.de/dispatch.php/course/details?sem_id=fc760068e7bca04db0eb188955db45f1&again=yes',
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
