const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
} else if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
} else {
  var theme = prefersDarkScheme.matches ? 'dark-theme' : 'light-theme';

  document.body.classList.add(theme);
  localStorage.setItem('theme', theme);
}

const themeButtons = document.querySelectorAll('.themebutton');

const switchTheme = function () {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');

    var theme = 'dark';
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');

    var theme = 'light';
  }

  localStorage.setItem('theme', theme);
};

Array.from(themeButtons).forEach((button) => {
  button.addEventListener('click', switchTheme);
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
