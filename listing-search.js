/**
 * listing-search.js — client-side keyword filter for tools/index.html
 * and playground/index.html.  Loaded with `defer` from both pages.
 *
 * Matches the query against each card's title + description text.
 * Sections that end up with zero visible cards are hidden so the page
 * doesn't show orphan headings.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('cardSearch');
    if (!input) return;

    var noResults = document.getElementById('searchNoResults');

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var cards = document.querySelectorAll('a.card');
      var visible = 0;

      cards.forEach(function (card) {
        var title = card.querySelector('.card-title');
        var desc  = card.querySelector('.card-desc');
        var text  = ((title ? title.textContent : '') + ' ' +
                     (desc  ? desc.textContent  : '')).toLowerCase();
        var match = !q || text.indexOf(q) !== -1;
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      // Hide sections whose every card is filtered out
      document.querySelectorAll('.section').forEach(function (section) {
        if (!q) { section.style.display = ''; return; }
        var sectionCards = section.querySelectorAll('a.card');
        var any = false;
        sectionCards.forEach(function (c) {
          if (c.style.display !== 'none') any = true;
        });
        section.style.display = any ? '' : 'none';
      });

      if (noResults) {
        noResults.style.display = (q && visible === 0) ? '' : 'none';
      }
    });
  });
}());
