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
  reflectPreference();
};

const applyThemeAttributes = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  document.querySelector('.themebutton').setAttribute('aria-live', theme.value);
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

const navButtons = document.querySelectorAll('.navbutton');
const navLinks = document.querySelectorAll('.navigation a');

const toggleNavigation = function () {
  document.body.classList.toggle('with-opened-navigation');
};

const closeNavigation = function () {
  document.body.classList.remove('with-opened-navigation');
};

if (navButtons && navLinks) {
  navButtons.forEach((button) => {
    button.addEventListener('click', toggleNavigation);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });
}

const externalLinks = document.querySelectorAll('main a[href^="http"]');
console.log(...externalLinks);

[...externalLinks].forEach((link) => {
  if (link.hostname != window.location.hostname) {
    link.target = '_blank';
  }
});
