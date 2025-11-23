// Toggle Menu Mobile
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Efek Navbar saat Scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(5, 5, 5, 0.9)";
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  } else {
    navbar.style.background = "rgba(5, 5, 5, 0.7)";
    navbar.style.boxShadow = "none";
  }
});

// Animasi Scroll Reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 }
);

const hiddenElements = document.querySelectorAll(
  ".reveal-text, .reveal-bottom"
);
hiddenElements.forEach((el) => observer.observe(el));
