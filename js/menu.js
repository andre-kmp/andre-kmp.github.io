document.addEventListener("DOMContentLoaded", () => {
  const langSelector = document.querySelector(".language-selector");
  const langBtn = langSelector.querySelector(".lang-btn");

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Impede o clique de "borbulhar" e fechar o menu principal
    langSelector.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    langSelector.classList.remove("open");
  });
});

function toggleMenu() {
  const nav = document.querySelector("header nav");
  nav.classList.toggle("show");

  if (nav.classList.contains("show")) {
    document.addEventListener("click", closeNavOnClickOutside);
  } else {
    document.removeEventListener("click", closeNavOnClickOutside);
  }
}

function closeNavOnClickOutside(e) {
  const nav = document.querySelector("header nav");
  const menuBtn = document.querySelector(".menu-toggle");
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
    nav.classList.remove("show");
    document.removeEventListener("click", closeNavOnClickOutside);
  }
}
