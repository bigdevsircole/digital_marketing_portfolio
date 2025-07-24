// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// Experience Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
  });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.style.display = 'inline-block';
  } else {
    backToTop.style.display = 'none';
  }
});

// EmailJS Form Submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // Validate form
  if (!form.checkValidity()) {
    status.innerHTML = 'Please fill all required fields correctly.';
    status.style.color = 'red';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  status.innerHTML = '';

  emailjs.sendForm('service_jqqfn9q', 'template_pjyxg1p', form)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      status.innerHTML = 'Message sent successfully! I\'ll get back to you soon.';
      status.style.color = '#64ffda';
      form.reset();
    }, function (error) {
      console.error('FAILED...', error);
      status.innerHTML = 'Failed to send message. Please try again or contact me directly at caleb.yinusa@gmail.com';
      status.style.color = 'red';
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message';
      setTimeout(() => {
        status.innerHTML = '';
      }, 5000);
    });
});