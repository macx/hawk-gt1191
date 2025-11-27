/**
 * View Transitions for tutorial navigation
 * Handles smooth title morphing between tutorial list and detail pages
 */

// Feature detection
if (
  'ViewTransition' in window ||
  typeof document.startViewTransition !== 'undefined'
) {
  // OLD PAGE: Mark the clicked title before navigating away
  window.addEventListener('pageswap', async (e) => {
    if (!e.viewTransition) return

    const targetUrl = e.activation?.entry?.url
    if (!targetUrl) return

    // Check if navigating to a tutorial detail page
    const isGoingToDetail = /\/tutorials\/[A-Za-z0-9\-]+$/.test(
      new URL(targetUrl).pathname
    )

    if (isGoingToDetail) {
      // Extract the tutorial ID from target URL
      const parts = new URL(targetUrl).pathname.split('/')
      const id = parts[2]

      if (id) {
        const article = document.querySelector(`[data-article-id="${id}"]`)
        const title = article?.querySelector('.title')

        if (title && title instanceof HTMLElement) {
          title.style.viewTransitionName = 'article-title'
          await e.viewTransition.finished
          title.style.viewTransitionName = ''
        }
      }
    }
  })

  // NEW PAGE: Mark the title when coming back to list
  window.addEventListener('pagereveal', async (e) => {
    if (!e.viewTransition) return

    const isListPage = /^\/tutorials(\/\d+)?$/.test(location.pathname)
    const referrer = document.referrer

    if (isListPage && referrer) {
      const isComingFromDetail = /\/tutorials\/[A-Za-z0-9\-]+$/.test(
        new URL(referrer).pathname
      )

      if (isComingFromDetail) {
        const parts = new URL(referrer).pathname.split('/')
        const id = parts[2]

        if (id) {
          const article = document.querySelector(`[data-article-id="${id}"]`)
          const title = article?.querySelector('.title')

          if (title && title instanceof HTMLElement) {
            title.style.viewTransitionName = 'article-title'
            await e.viewTransition.ready
            title.style.viewTransitionName = ''
          }
        }
      }
    }
  })
}
