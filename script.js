/* ===========================
   MAIN JS - Genos.Pro
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  // ── Navbar scroll effect ──────────────────────────────
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
  });

  // ── Hamburger menu ────────────────────────────────────
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".navbar-links");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  }

  // ── Active nav link ───────────────────────────────────
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ── Scroll-to-top button ──────────────────────────────
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.id = "scrollTopBtn";
  scrollTopBtn.title = "Back to top";
  scrollTopBtn.innerHTML = "↑";
  document.body.appendChild(scrollTopBtn);
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ── Intersection Observer: fade-in on scroll ──────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger cards
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  // Observe elements with animation classes
  // Note: gallery-item is excluded — gallery uses plain visible CSS, no fade-in
  document
    .querySelectorAll(".home-text, .home-image, .blog-card")
    .forEach((el, i) => {
      el.dataset.delay = i * 120;
      observer.observe(el);
    });

  // ── Toast helper ──────────────────────────────────────
  window.showToast = (msg) => {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  };

  // ── Contact form ──────────────────────────────────────
  const form = document.querySelector(".contact-card form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type='email']").value.trim();
      const msg = form.querySelector("textarea").value.trim();
      if (!email || !msg) {
        showToast("⚠️ Harap isi semua field!");
        return;
      }
      showToast("✅ Pesan terkirim! Terima kasih.");
      form.reset();
    });
  }

  // ── Blog card click ripple ────────────────────────────
  document.querySelectorAll(".blog-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const rect = card.getBoundingClientRect();
      circle.style.cssText = `
        position:absolute; border-radius:50%;
        width:10px; height:10px;
        background:rgba(234,155,37,0.4);
        transform:scale(0);
        animation:ripple 0.6s linear;
        left:${e.clientX - rect.left - 5}px;
        top:${e.clientY - rect.top - 5}px;
        pointer-events:none;
      `;
      card.style.position = "relative";
      card.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // inject ripple keyframe once
  if (!document.getElementById("ripple-style")) {
    const s = document.createElement("style");
    s.id = "ripple-style";
    s.textContent = `@keyframes ripple { to { transform: scale(40); opacity: 0; } }`;
    document.head.appendChild(s);
  }
});
