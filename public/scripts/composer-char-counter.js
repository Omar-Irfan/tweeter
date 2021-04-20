$(document).ready(function() {
  $("textarea").on('input', function() {
    const charaCount= 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter')
    console.log(counter[0].innerText = charaCount)
  })
});