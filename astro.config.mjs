import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'

import { remarkModifiedTime } from './remark-plugins/remark-modified-time.mjs'
import { remarkDeruntify } from './remark-plugins/remark-deruntify.mjs'
import {
  remarkDefinitionList,
  defListHastHandlers
} from 'remark-definition-list'

import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    gfm: true,
    smartypants: true,
    remarkPlugins: [remarkDeruntify, remarkDefinitionList, remarkModifiedTime],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutoLinkHeadings, { content: [] }],
      [rehypeExternalLinks, {}]
    ]
  },
  integrations: [
    mdx({
      remarkRehype: {
        handlers: {
          ...defListHastHandlers
        },
        footnoteLabel: 'Fußnoten',
        footnoteBackLabel: 'Zurück zum Inhalt'
      },
      gfm: true
    }),
    icon({
      include: {
        materialSymbols: ['menu', 'close', 'arrow-upward-rounded'],
        simpleIcons: ['discord']
      },
      svgoOptions: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,

                inlineStyles: {
                  onlyMatchedOnce: false
                }
              }
            }
          }
        ]
      }
    })
  ]
})
