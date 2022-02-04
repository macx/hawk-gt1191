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
  document.documentElement.setAttribute('data-theme', theme.value);
  // document
  //   .querySelector('.themebutton')
  // .setAttribute('aria-live', theme.value)
  //   .setAttribute('aria-pressed', true);
};

const theme = {
  value: getThemePreference(),
};

applyThemeAttributes();

window.onload = () => {
  applyThemeAttributes();

  document.querySelector('.themebutton').addEventListener('click', () => {
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

/*
┌──────────────────────────────────┐
  NAVIGATION
└──────────────────────────────────┘
*/

const navButtons = document.querySelectorAll('.js-toggle-nav');
// const navLinks = document.querySelectorAll('.navigation a');

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

  // navLinks.forEach((link) => {
  //   link.addEventListener('click', closeNavigation);
  // });
}

const externalLinks = document.querySelectorAll('main a[href^="http"]');
// console.log(...externalLinks);

[...externalLinks].forEach((link) => {
  if (link.hostname != window.location.hostname) {
    link.target = '_blank';
  }
});
