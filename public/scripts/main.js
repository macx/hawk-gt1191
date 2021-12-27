(() => {
  // <stdin>
  var getThemePreference = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
  };
  var setThemePreference = () => {
    localStorage.setItem("theme", theme.value);
    reflectPreference();
  };
  var applyThemeAttributes = () => {
    console.log("apply", theme.value);
    document.documentElement.setAttribute("data-theme", theme.value);
    document.querySelector(".themebutton").setAttribute("aria-live", theme.value);
  };
  var theme = {
    value: getThemePreference()
  };
  applyThemeAttributes();
  window.onload = () => {
    applyThemeAttributes();
    document.querySelector(".themebutton").addEventListener("click", () => {
      theme.value = theme.value === "light" ? "dark" : "light";
      applyThemeAttributes();
      setThemePreference();
    });
  };
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    theme.value = isDark ? "dark" : "light";
    setThemePreference();
  });
  var navButtons = document.querySelectorAll(".navbutton");
  var navLinks = document.querySelectorAll(".navigation a");
  var toggleNavigation = function() {
    document.body.classList.toggle("with-opened-navigation");
  };
  var closeNavigation = function() {
    document.body.classList.remove("with-opened-navigation");
  };
  if (navButtons && navLinks) {
    navButtons.forEach((button) => {
      button.addEventListener("click", toggleNavigation);
    });
    navLinks.forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });
  }
})();
