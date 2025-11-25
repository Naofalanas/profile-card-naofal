// 1. Toggle Menu Mobile
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

// 2. Efek Navbar saat Scroll (Glassmorphism adjustments)
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(5, 5, 5, 0.95)"; // Lebih pekat dikit biar teks jelas
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  } else {
    navbar.style.background = "rgba(5, 5, 5, 0.7)";
    navbar.style.boxShadow = "none";
  }
});

// 3. FITUR BARU: Scroll Spy (Menu Aktif Otomatis)
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Offset -200 biar highlight pindah sebelum bener-bener nyentuh garis atas
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("href").includes(current)) {
      li.classList.add("active");
    }
  });
});

// 4. FITUR BARU: Dynamic Year (Biar gak usah ganti manual tiap tahun)
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 5. Animasi Scroll Reveal (Tetap dipertahankan)
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
// --- CONTACT FORM HANDLER (EMAILJS) ---
const contactForm = document.getElementById("contact-form");
const btnSubmit = document.getElementById("btn-submit");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ubah tombol jadi 'Loading...'
    btnSubmit.textContent = "Mengirim...";
    btnSubmit.disabled = true;

    // GANTI 'YOUR_SERVICE_ID' dan 'YOUR_TEMPLATE_ID' DENGAN ID LU SENDIRI
    const serviceID = "service_dplofqq";
    const templateID = "template_usdqngw";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        // Sukses
        btnSubmit.textContent = "Kirim Pesan";
        btnSubmit.disabled = false;
        formStatus.textContent = "✅ Pesan berhasil terkirim!";
        formStatus.style.color = "#00d2d3";
        contactForm.reset(); // Kosongkan form

        setTimeout(() => {
          formStatus.textContent = "";
        }, 5000);
      },
      (err) => {
        // Gagal
        btnSubmit.textContent = "Kirim Pesan";
        btnSubmit.disabled = false;
        formStatus.textContent = "❌ Gagal mengirim. Coba lagi nanti.";
        formStatus.style.color = "red";
        console.log(JSON.stringify(err));
      }
    );
  });
}
// --- TYPING EFFECT LOGIC ---
const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullTxt = this.words[current];

  // Check if deleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type Speed
  let typeSpeed = 200; // Kecepatan ngetik normal

  if (this.isDeleting) {
    typeSpeed /= 2; // Hapus lebih cepet biar gak lama nunggu
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  // Cek kalau elemen ada baru jalanin, biar gak error di halaman lain
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }
}
// --- PRELOADER LOGIC ---
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
    // Hapus elemen dari DOM setelah animasi selesai biar ringan
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
});
