import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context) {
  return rss({
    title: 'HAWK GT 1191 | Blog',
    description: 'The HAWK GT 1191 blog',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./blog/*.mdx')),
    customData: '<language>de-de</language>'
  })
}
