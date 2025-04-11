// Tutorial by:
// https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/
import { getCollection, type CollectionEntry } from 'astro:content'
import fs from 'fs'
import path from 'path'
import { ImageResponse } from '@vercel/og'

interface Props {
  params: { id: string }
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
            tw: 'absolute top-0 left-0 w-full h-full opacity-40 flex',
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
                        src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='Ebene_1' data-name='Ebene 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 239.68 34.5'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23000; %7D .cls-1, .cls-2, .cls-3 %7B stroke-width: 0px; %7D .cls-2 %7B fill: %23004fcd; %7D .cls-3 %7B fill: %23fff; %7D %3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M5.36,18.74h12.64v15.76h5.35V0h-5.35v13.79H5.36V0H0v34.5h5.36v-15.76ZM34.5,0l-9.64,34.5h5.84l3.58-12.86h8.33l-1.17-4.92h-5.79L40.34,0h-5.84ZM40.82,0l8.32,34.5h5.84l6.57-27.96,6.56,27.96h5.84L82.27,0h-5.83l-5.48,27.66L64.46,0h-5.83l-6.49,27.66L46.67,0h-5.85ZM81.74,16.73l10.69,17.77h6.33l-10.7-17.76L98.52,0h-6.33l-10.45,16.73Z'/%3E%3Cpath class='cls-2' d='M95.43,17.25l10.51,17.25h132.24V0H105'/%3E%3Cpath class='cls-3' d='M125.52,17c0,2.48.13,5.42.17,7.47-5.22.1-7.08-2.61-7.08-7.53,0-4.18,1.3-7.08,9.59-6.75l-.2-3.56c-10.08.29-13.18,5.05-13.18,11,0,7.24,4.57,11.41,14.22,9.29v-9.85l-3.52-.07ZM132.31,10.05h5.94v17.09h3.78V10.05h5.77v-3.13h-15.23l-.26,3.13h0ZM168.03,6.27l-3.49.29v2.38l-5.03.53.07,2.64,4.96-.13v12.13h-5.48v3.03h13.57l.29-3.03h-4.89V6.27ZM185.97,6.27l-3.49.29v2.38l-5.02.53.06,2.64,4.96-.13v12.13h-5.48v3.03h13.57l.29-3.03h-4.89V6.27ZM201.36,6.53c-3.76-.17-6.94,2.74-7.11,6.5,0,.17,0,.33,0,.5,0,5.44,5.71,7.47,10.31,4.17-.75,2.87-2.94,5.09-8.12,7.18l1.5,3c7.14-3.23,10.34-7.76,10.34-13.4,0-5.21-2.81-7.95-6.92-7.95ZM204.89,15.47c-3.85,2.38-7.28,1.3-7.28-2.35,0-2.41,1.47-3.72,3.4-3.72,2.21,0,3.88,1.66,3.88,5.42v.65ZM221.85,24.11V6.27l-3.49.29v2.38l-5.02.53.06,2.64,4.96-.13v12.13h-5.48v3.03h13.57l.29-3.03h-4.89Z'/%3E%3C/svg%3E",
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

  try {
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
  } catch (e: any) {
    console.error('ERROR', e)
    return new Response(`Failed to generate the open graph image`, {
      status: 500
    })
  }
}

export async function getStaticPaths() {
  const tutorials = await getCollection('tutorials', ({ data }) => {
    return import.meta.env.PROD ? data.isDraft !== true : true
  })

  return tutorials.map((tutorial) => ({
    params: { id: tutorial.id },
    props: { tutorial }
  }))
}
