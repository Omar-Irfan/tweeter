$(document).ready(function() {
  $("textarea").on('input', function() {
    const charaCount = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter[0].innerText = charaCount;
    if (charaCount < 0) {
      counter.css("color", "red");
    }
    if (charaCount >= 0) {
      counter.css("color", "rgba(65, 60, 60, 0.836)");
    }

  });
});