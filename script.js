// --- 1. PRELOADER AMAN (ANTI MACET) ---
const preloader = document.getElementById("preloader");

function removePreloader() {
  if (preloader && !preloader.classList.contains("hide")) {
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.remove(); // Hapus elemen dari HTML biar ringan
    }, 500);
  }
}

// Failsafe: Paksa hilang setelah 2.5 detik (kalau internet user lemot)
setTimeout(removePreloader, 2500);

// Normal: Hilang pas semua asset ke-load
window.addEventListener("load", removePreloader);

// Cepat: Hilang pas HTML siap (opsional, biar makin ngebut)
document.addEventListener("DOMContentLoaded", removePreloader);

// --- 2. GSAP ANIMATION (MODERN) ---
document.addEventListener("DOMContentLoaded", () => {
  // Cek apakah GSAP sudah ada
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Animasi Hero
    const tl = gsap.timeline();
    tl.from(".hero-content", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    }).from(
      ".img-box",
      {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    // Animasi Scroll Section
    gsap.utils
      .toArray(
        ".section-title, .about-container, .project-card, .contact-container"
      )
      .forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
  } else {
    console.warn("GSAP belum ke-load, animasi skip.");
  }
});

// --- 3. NAVBAR & MOBILE MENU ---
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// Efek Glass Navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(5, 5, 5, 0.9)";
      navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
    } else {
      navbar.style.background = "rgba(5, 5, 5, 0.7)";
      navbar.style.boxShadow = "none";
    }
  }
});

// --- 4. DYNAMIC YEAR ---
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// --- 5. CONTACT FORM (EMAILJS) ---
const contactForm = document.getElementById("contact-form");
const btnSubmit = document.getElementById("btn-submit");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    btnSubmit.textContent = "Mengirim...";
    btnSubmit.disabled = true;

    // GANTI ID SESUAI AKUN EMAILJS LU
    const serviceID = "service_dplofqq";
    const templateID = "template_usdqngw";

    if (typeof emailjs !== "undefined") {
      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          btnSubmit.textContent = "Kirim Pesan";
          btnSubmit.disabled = false;
          formStatus.textContent = "✅ Pesan terkirim!";
          formStatus.style.color = "#00d2d3";
          contactForm.reset();
          setTimeout(() => (formStatus.textContent = ""), 5000);
        },
        (err) => {
          btnSubmit.textContent = "Kirim Pesan";
          btnSubmit.disabled = false;
          formStatus.textContent = "❌ Gagal kirim.";
          formStatus.style.color = "red";
          console.error(err);
        }
      );
    }
  });
}

// --- 6. MOUSE PARALLAX EFFECT (BONUS) ---
// Efek foto profil gerak ngikutin mouse
const heroSection = document.querySelector(".hero");
const imgBox = document.querySelector(".img-box");

if (heroSection && imgBox) {
  heroSection.addEventListener("mousemove", (e) => {
    // Hitung posisi mouse
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // Gerak max 20px horizontal
    const y = (e.clientY / window.innerHeight - 0.5) * 20; // Gerak max 20px vertikal

    // Pakai GSAP biar smooth banget
    gsap.to(imgBox, {
      x: x,
      y: y,
      duration: 1, // Durasi agak lama biar efeknya 'floating'
      ease: "power2.out",
    });
  });

  // Balik ke tengah pas mouse keluar
  heroSection.addEventListener("mouseleave", () => {
    gsap.to(imgBox, { x: 0, y: 0, duration: 1, ease: "power2.out" });
  });
}

// Back to Top Logic
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    // Muncul setelah scroll 300px
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});
