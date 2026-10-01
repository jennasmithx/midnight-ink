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
  var STUDIO_PHONE_DISPLAY = '082 769 0085';
  var STUDIO_PHONE_TEL = '+27827690085';
  var STUDIO_WHATSAPP = '27827690085';

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = Object.fromEntries(new FormData(form).entries());
      var firstName = (data.name || '').trim().split(' ')[0];

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

      var whatsappText = 'Hi Midnight Ink, I just sent an enquiry' + (firstName ? ' (' + firstName + ')' : '') + ' — following up here too.';
      var whatsappLink = 'https://wa.me/' + STUDIO_WHATSAPP + '?text=' + encodeURIComponent(whatsappText);

      var msg = document.querySelector('.form-msg');
      if (msg) {
        msg.innerHTML =
          '<div class="fm-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12l5 5L20 6"/></svg></div>' +
          '<h4>Thank You' + (firstName ? ', ' + escapeHtml(firstName) : '') + '</h4>' +
          '<p>We will contact you shortly to confirm your consultation. Your email app should be opening now to send this through — if it doesn’t, reach us directly below.</p>' +
          '<div class="fm-actions">' +
          '<a class="btn btn-ghost" href="tel:' + STUDIO_PHONE_TEL + '">Call ' + STUDIO_PHONE_DISPLAY + '</a>' +
          '<a class="btn btn-ghost" href="' + whatsappLink + '" target="_blank" rel="noopener">WhatsApp Us</a>' +
          '</div>';
        msg.classList.add('show');
      }
      form.reset();
    });
  }

});
