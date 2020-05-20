// Set active element of external carousel indicator on slide change
$('.carousel').bind('slide.bs.carousel', function(e) {
  const index = $(e.relatedTarget).index();

  $(`[data-target="#${$(this).prop('id')}"]`).each(function(i) {
    if (i === index) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
});
