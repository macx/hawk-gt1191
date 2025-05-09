import { getCollection } from 'astro:content'
import { SITE_CONST } from '../const.ts'

export async function GET() {
  const tutorials = await getCollection('tutorials', ({ data }) => {
    return data.isDraft === false
  })

  if (!tutorials) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    })
  }

  const filteredTutorials = tutorials.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  )

  const tutorialsList = filteredTutorials.map((tutorial) => {
    return {
      title: tutorial.data.title,
      pubDate: tutorial.data.pubDate,
      id: tutorial.id,
      path: `tutorials/${tutorial.id}`,
      url: `${SITE_CONST.site}/tutorials/${tutorial.id}`,
      tags: tutorial.data.tags
    }
  })

  return new Response(JSON.stringify({ tutorials: tutorialsList }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
