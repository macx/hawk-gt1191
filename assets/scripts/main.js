/*
┌──────────────────────────────────┐
  SERVICE WORKER
└──────────────────────────────────┘
*/

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

/*
┌──────────────────────────────────┐
  THEME SWITCHER
└──────────────────────────────────┘
*/

const modeSwitchInput = document.querySelector('[data-mode-switch]');

if (modeSwitchInput) {
  const getThemePreference = () => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
  };

  const setThemePreference = () => {
    localStorage.setItem('theme', theme.value);
    applyThemeAttributes();
  };

  const applyThemeAttributes = () => {
    document.documentElement.setAttribute('data-mode', theme.value);

    modeSwitchInput.checked = theme.value === 'dark' ? false : true;
  };

  const theme = {
    value: getThemePreference(),
  };

  applyThemeAttributes();

  window.onload = () => {
    applyThemeAttributes();

    modeSwitchInput.addEventListener('change', () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
      applyThemeAttributes();
      setThemePreference();
    });
  };

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      theme.value = isDark ? 'dark' : 'light';
      setThemePreference();
    });
}

/*
┌──────────────────────────────────┐
  NAVIGATION
└──────────────────────────────────┘
*/

const navButtons = document.querySelectorAll('.js-toggle-nav');

const toggleNavigation = function () {
  document.body.classList.toggle('with-nav');
};

const closeNavigation = function () {
  document.body.classList.remove('with-nav');
};

if (navButtons) {
  navButtons.forEach((button) => {
    button.addEventListener('click', toggleNavigation);
  });
}

/*
┌──────────────────────────────────┐
  RE-ROUTE EXTERNAL LINKS
└──────────────────────────────────┘
*/

const externalLinks = document.querySelectorAll('main a[href^="http"]');

[...externalLinks].forEach((link) => {
  if (link.hostname != window.location.hostname) {
    link.target = '_blank';
  }
});

/*
┌──────────────────────────────────┐
  LINKED HEADLINES
└──────────────────────────────────┘
*/

const linkedHeadlines = document.querySelectorAll(['h1[id], h2[id]']);
const linkedSections = document.querySelectorAll(['.stage__item[id]']);
const stageNavigation = document.querySelector('.stage__navigation');

function headlinesObserverCallback(entries) {
  const stageNavigationLinks = stageNavigation.querySelectorAll('a');

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const navItem = stageNavigation.querySelector(
        'a[href="#' + entry.target.id + '"]'
      );

      if (navItem) {
        stageNavigationLinks.forEach((link) =>
          link.classList.remove('is-active')
        );
        navItem.classList.toggle('is-active');
      }
    }
  });
}

if (
  stageNavigation &&
  (linkedHeadlines.length > 0 || linkedSections.length > 0)
) {
  const headlinesObserver = new IntersectionObserver(
    headlinesObserverCallback,
    {
      rootMargin: '0px',
      threshold: 0.5,
    }
  );

  [...linkedHeadlines].forEach((item) => headlinesObserver.observe(item));
  [...linkedSections].forEach((item) => headlinesObserver.observe(item));
}
