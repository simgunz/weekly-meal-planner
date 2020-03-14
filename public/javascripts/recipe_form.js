$(document).ready(function($) {
  $('#ingredients-add').click(function(e) {
    const val = $('#ingredients-input').val();
    $('#ingredients-list').append(`<li>${val}</li>`);
    $('#ingredients-input').val('');
    e.preventDefault();
  });

  $('#ingredients-input').keypress(function(e) {
    const key = e.which;
    if (key === 13) {
      // the enter key code
      $('#ingredients-add').click();
      return false;
    }
  });

  $('#theform').submit(function() {
    //    e.preventDefault();
    $('#ingredients-list li').each(function() {
      $('<input />')
        .attr('type', 'hidden')
        .attr('name', 'ingredients[]')
        .attr('value', $(this).text())
        .appendTo('#theform');
    });
    return true;
  });
});
