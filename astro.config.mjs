import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import astroFont from '@gamesome/astro-font'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'

import { remarkModifiedTime } from './remark-plugins/remark-modified-time.mjs'
import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs'
import { remarkWidont } from './remark-plugins/remark-widont.mjs'
import {
  remarkDefinitionList,
  defListHastHandlers
} from 'remark-definition-list'

import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

import expressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  site: 'https://hawk-gt1191.de',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  redirects: {
    '/komponenten': {
      status: 301,
      destination: '/assets'
    },
    '/links': {
      status: 301,
      destination: '/dokumentation'
    },
    '/hilfe': '/dokumentation',
    '/seminar': '/',
    '/tutorials/lernpfade': '/tutorials/lernpfade/grundlagen',
    '/tutorials/art-direction-im-kreditantragsprozess': {
      status: 301,
      destination: '/tutorials/responsive-images'
    }
  },
  markdown: {
    shikiConfig: {
      wrap: true
    },
    gfm: true,
    smartypants: true,
    remarkPlugins: [
      remarkWidont,
      remarkDefinitionList,
      remarkModifiedTime,
      remarkReadingTime
    ],
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
    expressiveCode({
      themes: ['catppuccin-frappe', 'catppuccin-latte'],
      themeCssSelector: (theme) => `[data-code-theme='${theme.name}']`,
      styleOverrides: {}
    }),
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
    sitemap({
      lastmod: new Date(),
      filter: (page) =>
        page !== 'https://hawk-gt1191.de/impressum' &&
        page !== 'https://hawk-gt1191.de/datenschutz'
    }),
    astroFont({
      families: [
        {
          name: 'Open Sans Variable',
          imports: ['@fontsource-variable/open-sans/wdth.css']
        },
        {
          name: 'Domine Variable',
          type: 'sans-serif',
          applyFontFamilyToSelector: ':where(h1, h2, h3, h4)',
          imports: ['@fontsource-variable/domine/wght.css']
        },
        {
          name: 'JetBrains Mono Variable',
          type: 'mono',
          fallbacks: ['Courier New'],
          applyFontFamilyToSelector: 'code',
          imports: ['@fontsource-variable/jetbrains-mono/wght.css']
        }
      ]
    }),
    icon({
      include: {
        materialSymbols: [
          'menu',
          'close',
          'monitor-outline',
          'arrow-upward-rounded',
          'keyboard-double-arrow-left',
          'keyboard-double-arrow-right',
          'keyboard-arrow-left',
          'keyboard-arrow-right',
          'schedule-outline'
        ],
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
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },
  experimental: {
    responsiveImages: true,
    svg: true
  }
})
