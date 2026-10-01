// Midnight Ink Tattoo Studio — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Highlight active nav link based on current page
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) header.style.borderBottomColor = 'rgba(201,162,39,0.35)';
      else header.style.borderBottomColor = 'rgba(201,162,39,0.15)';
    });
  }

  // Gallery filtering (gallery.html)
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  }

  // Contact form — opens a pre-filled email to the studio via mailto:.
  // This needs no backend/signup, but relies on the visitor having a mail
  // app configured. Swap for a form service (Formspree, Netlify Forms) once
  // the site is hosted somewhere, for a smoother no-app-required submit.
  var form = document.querySelector('.contact-form');
  var STUDIO_EMAIL = 'info@midnightink.co.za';
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = Object.fromEntries(new FormData(form).entries());
      var subject = 'Consultation Enquiry — ' + (data.name || 'New Enquiry');
      var body =
        'Name: ' + (data.name || '') + '\n' +
        'Phone / WhatsApp: ' + (data.phone || '') + '\n' +
        'Email: ' + (data.email || '') + '\n' +
        'Placement: ' + (data.placement || '') + '\n' +
        'Approximate Size: ' + (data.size || '') + '\n\n' +
        (data.message || '');

      var mailtoLink = 'mailto:' + STUDIO_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailtoLink;

      var msg = document.querySelector('.form-msg');
      if (msg) {
        msg.textContent = 'Opening your email app to send this through — if nothing opens, email us directly at ' + STUDIO_EMAIL + '.';
        msg.classList.add('show');
      }
      form.reset();
    });
  }

});
