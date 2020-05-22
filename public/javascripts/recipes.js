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

$('#deleteModal').on('show.bs.modal', function(e) {
  const button = $(e.relatedTarget);
  const url = button.data('url');
  $('#deleteForm').attr('action', url);
});
