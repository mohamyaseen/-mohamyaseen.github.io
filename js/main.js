// Slider functionality
const slider = document.getElementById('services-slider');
const nextBtn = document.getElementById('slider-next');
const prevBtn = document.getElementById('slider-prev');

if (slider && nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 350, behavior: 'smooth' });
  });
  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -350, behavior: 'smooth' });
  });
}

// Simple contact form handling (no back-end, just validation & UX)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const resultDiv = document.getElementById('form-result');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Basic client-side validation (HTML5 covers most)
      resultDiv.style.color = "#bfa046";
      resultDiv.textContent = "تم إرسال استفسارك بنجاح! سنعاود التواصل معك قريبًا.";
      form.reset();
      setTimeout(() => {
        resultDiv.textContent = "";
      }, 7000);
    });
  }
});