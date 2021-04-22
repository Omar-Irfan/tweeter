$(document).ready(function() {
  $("textarea").on('input', function() { //takes input data from form on page
    const charaCount = 140 - $(this).val().length; //sets counter value to equal 140 - # of characters inputed
    const counter = $(this).parent().find('.counter');
    counter[0].innerText = charaCount; //replaces innerText with counter
    if (charaCount < 0) {
      counter.css("color", "red"); //if counter fallse below zero colour changes to red
    }
    if (charaCount >= 0) {
      counter.css("color", "rgba(65, 60, 60, 0.836)");
      //if counter returns to zero or above colour returns to normal
    }

  });
});