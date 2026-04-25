document.addEventListener("DOMContentLoaded", () => {
  // 1. Efek Navbar Berubah Warna Saat Scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Interaksi Form Contact (Mencegah reload dan memunculkan pop-up)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah halaman reload

      const email = this.querySelector('input[name="user_email"]').value;
      const message = this.querySelector('textarea[name="user_message"]').value;

      if (email && message) {
        alert(`Terima kasih! Pesan dari ${email} telah berhasil dikirim.`);
        this.reset(); // Mengosongkan form setelah dikirim
      } else {
        alert("Mohon isi email dan pesan terlebih dahulu.");
      }
    });
  }

  // 3. Animasi Scroll Reveal untuk Halaman Gallery
  const galleryCards = document.querySelectorAll(".gallery-card");

  const observerOptions = {
    threshold: 0.2, // Muncul ketika 20% elemen terlihat di layar
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Hanya animasi 1 kali
      }
    });
  }, observerOptions);

  galleryCards.forEach((card) => {
    observer.observe(card);
  });
});
