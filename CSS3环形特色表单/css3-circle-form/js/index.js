function setWheelRotation(rotation) {
  $('.wheel').css('transform', 'rotate('+rotation+'deg)');
}

function onSubmit() {
  $('.wheel').addClass('sent');
  setWheelRotation(697.5);
  setTimeout(function() {
    $('.wheel').removeClass('sent');
    $('input').val('');
    firstInputField().focus();
  }, 5000);
  return false;
}

function firstInputField() {
  return $('.wheel li:first-child > input');
}

$('form').on('submit', function() {
  onSubmit();
});

$('input').on('focus', function() {
  var index = $(this).parent().index();
  var rotation = -22.5 - (45 * index);
  setWheelRotation(rotation);
});

var lastTabIndex = $('[tabindex]').length;

$('[tabindex]').on('keydown', function(event) {
  if (event.keyCode == 9) { // Tab pressed
    event.preventDefault();
    var currentElement = $(this).get(0);
    var curIndex = currentElement.tabIndex;
    if (event.shiftKey) {
      if (curIndex == 1) {
        return;
      } else {
        curIndex--;
      }
    } else {
      if (curIndex == lastTabIndex) {
        return;
      } else {
        curIndex++;
      }
    }
    
    $('[tabindex='+curIndex+']').focus();
  }
});

$(document).ready(function() {
  $('.wheel').removeClass('closed');
  firstInputField().focus();
});