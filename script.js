/* Tipsy Tinnies — small interactions. No dependencies. */
(function () {
  'use strict';

  /* Mobile navigation */
  var toggle = document.querySelector('.header__toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('nav--open', open);
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* Events rail: prev / next buttons scroll one card at a time */
  var rail = document.querySelector('[data-rail]');
  var prev = document.querySelector('[data-rail-prev]');
  var next = document.querySelector('[data-rail-next]');

  if (rail && prev && next) {
    function step() {
      var card = rail.querySelector('.rail__card');
      var gap = parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || 16;
      return card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prev.addEventListener('click', function () {
      rail.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' });
    });
    next.addEventListener('click', function () {
      rail.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* Only one accordion open per group */
  document.querySelectorAll('.accordion').forEach(function (group) {
    group.addEventListener('toggle', function (e) {
      if (!e.target.open) return;
      group.querySelectorAll('details[open]').forEach(function (d) {
        if (d !== e.target) d.open = false;
      });
    }, true);
  });
})();
