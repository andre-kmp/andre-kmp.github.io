document.addEventListener("DOMContentLoaded", () => {
  const langSelector = document.querySelector(".language-selector");
  const langBtn = langSelector.querySelector(".lang-btn");
  const nav = document.querySelector("header nav");

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // impede conflito com clique fora
    langSelector.classList.toggle("open");

    // se o menu principal estiver aberto, fecha
    if (nav.classList.contains("show")) {
      nav.classList.remove("show");
      document.removeEventListener("click", closeNavOnClickOutside);
    }
  });

  document.addEventListener("click", () => {
    langSelector.classList.remove("open");
  });
});

// Menu principal
function toggleMenu() {
  const nav = document.querySelector("header nav");
  nav.classList.toggle("show");

  // se abriu, ativa escuta para clique fora
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
