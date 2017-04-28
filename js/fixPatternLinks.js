/* globals $ */
var fixPatternLinks = function() {
  if (window.location.pathname.indexOf('designsystem') === 1) {
    $('a').each(function() {
      if (typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false && $(this).attr('href').indexOf('designsystem') === -1) {
        $(this).attr('href', $(this).attr('href').replace('/patterns/', '/designsystem/patterns/'));
      }
    });
    $('*[onclick]').each(function() {
      if ($(this).attr('onclick').indexOf('location.href=\'/patterns/') > -1) {
        $(this).attr('onclick', $(this).attr('onclick').replace('location.href=\'/patterns/', 'location.href=\'/designsystem/patterns/'));
      }
    });
  }
};

$(document).ready(function () {
    fixPatternLinks();
});