// set current year
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
});

/* ===== CLOSE NAV ON LINK CLICK (mobile) ===== */
document.querySelectorAll('#nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
});

/* ===== SCROLL REVEAL EFFECT ===== */
function reveal() {
  let reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 120;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      // optional: keep visible once revealed by removing remove line
      reveals[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

/* ===== EMAILJS INTEGRATION =====
 Replace the placeholders below with your EmailJS values.
 1. Sign up at https://www.emailjs.com/
 2. Create an email service (e.g., Gmail) -> Service ID (e.g., "service_xxx")
 3. Create a template -> Template ID (e.g., "template_xxx")
 4. Copy your Public Key (API key) -> Public Key (e.g., "user_xxx")
 Ensure your template uses variables: {{from_name}}, {{email_id}}, {{message}} or change keys below.
*/
(function () {
  // initialize EmailJS: replace with your Public Key
  emailjs.init('YOUR_PUBLIC_KEY');
})();

const form = document.getElementById('contactForm');
const statusMsg = document.getElementById('statusMsg');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // gather values
  const params = {
    from_name: document.getElementById('name').value,
    email_id: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  // Replace with your service ID and template ID
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params)
    .then(function (response) {
      console.log('SUCCESS', response.status, response.text);
      statusMsg.style.color = 'green';
      statusMsg.textContent = '✅ Message Sent Successfully!';
      form.reset();
    }, function (error) {
      console.error('FAILED', error);
      statusMsg.style.color = 'crimson';
      statusMsg.textContent = '❌ Failed to send. Check console and EmailJS settings.';
    });
});
