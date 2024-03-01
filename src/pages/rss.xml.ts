import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_CONST } from '../const.ts'

export async function GET(context: { site: string }) {
  const articles = await getCollection('tutorials', ({ data }) => {
    return import.meta.env.PROD ? data.isDraft !== true : true
  })
  articles.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf())

  return rss({
    title: SITE_CONST.title,
    description: SITE_CONST.description,
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/tutorials/${article.slug}/`
    })),
    stylesheet: '/rss-styles.xsl'
  })
}
