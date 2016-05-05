(function() {
  $('a[href*="#"]').click(function() {
    event.preventDefault();
    var link = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(link).offset().top - 90
    }, 600);
  });
})();
