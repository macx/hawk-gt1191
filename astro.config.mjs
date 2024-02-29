import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
// import astroFont from '@gamesome/astro-font'
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
  site: 'https://hawk-gt1191.de',
  redirects: {
    '/komponenten': '/assets',
    '/links': '/dokumentation'
  },
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
      [
        rehypeAutoLinkHeadings,
        {
          content: {
            type: 'element',
            tagName: 'span',
            properties: { className: 'heading-icon' },
            children: []
          }
        }
      ],
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
    // astroFont({
    //   families: [
    //     {
    //       name: 'Open Sans Variable',
    //       imports: ['@fontsource-variable/open-sans/wdth.css']
    //     },
    //     {
    //       name: 'Domine Variable',
    //       type: 'sans-serif',
    //       applyFontFamilyToSelector: ':is(h1, h2, h3, h4)',
    //       imports: ['@fontsource-variable/open-sans/wdth.css']
    //     },
    //     {
    //       name: 'JetBrains Mono Variable',
    //       type: 'mono',
    //       fallbacks: ['Courier New'],
    //       applyFontFamilyToSelector: 'code',
    //       imports: ['@fontsource-variable/open-sans/wdth.css']
    //     }
    //   ]
    // }),
    icon({
      include: {
        materialSymbols: ['menu', 'close', 'arrow-upward-rounded'],
        simpleIcons: ['discord', 'github']
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
