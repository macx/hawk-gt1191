// Tutorial by:
// https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/
import { getCollection, type CollectionEntry } from 'astro:content'
import fs from 'fs'
import path from 'path'
import { ImageResponse } from '@vercel/og'

interface Props {
  params: { slug: string }
  props: { tutorial: CollectionEntry<'tutorials'> }
}

export async function GET({ props }: Props) {
  const { tutorial } = props

  if (tutorial.data.cover === undefined) {
    return
  }

  // Load images
  const coverImage = tutorial.data.cover.path.replace(/^\//, '')
  const tutorialCover = fs.readFileSync(coverImage)
  const hawkLogo = fs.readFileSync(path.resolve('src/images/hawk-gt1191.png'))

  // Fonts
  const DomineBold = fs.readFileSync(path.resolve('src/fonts/Domine-Bold.ttf'))
  const OpenSansSemiBold = fs.readFileSync(
    path.resolve('src/fonts/OpenSans-SemiBold.ttf')
  )

  const html = {
    type: 'div',
    props: {
      tw: 'w-full h-full flex items-center justify-center relative',
      style: {
        background: '#edf0f2',
        fontFamily: 'Open Sans SemiBold'
      },
      children: [
        {
          type: 'div',
          props: {
            tw: 'absolute top-0 left-0 w-full h-full blur-lg opacity-40 flex',
            style: {
              zIndex: '0',
              filter: 'blur(10px)'
            },
            children: [
              {
                type: 'img',
                props: {
                  src: tutorialCover.buffer,
                  tw: 'w-full'
                }
              }
            ]
          }
        },
        {
          type: 'div',
          props: {
            tw: 'w-[350px] flex rounded-md overflow-hidden px-12',
            style: {
              aspectRatio: '16 / 9'
            },
            children: [
              {
                type: 'img',
                props: {
                  src: tutorialCover.buffer,
                  tw: 'w-[350px]'
                }
              }
            ]
          }
        },
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex px-12',
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '55px',
                    fontFamily: 'Domine Bold'
                  },
                  children: tutorial.data.title
                }
              }
            ]
          }
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[40px] bottom-[40px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'flex',
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: hawkLogo.buffer,
                        tw: 'w-[260px]'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Domine Bold', data: DomineBold.buffer, style: 'normal' },
      {
        name: 'Open Sans SemiBold',
        data: OpenSansSemiBold.buffer,
        style: 'normal'
      }
    ]
  })
}

export async function getStaticPaths() {
  const tutorials = await getCollection('tutorials')

  return tutorials.map((tutorial) => ({
    params: { slug: tutorial.slug },
    props: { tutorial }
  }))
}
