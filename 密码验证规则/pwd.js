// Yair Even-or 2016
// Password field - rules validation demo

// Events
$(':password').on('input', onPasswordInput);
$('.togglePass').on('click', onTogglePassBtnClick)

// Callbacks
function onPasswordInput(e) {
  var $input = $(this),
    value = this.value,
    $rulesItems = $input.closest('.field').find('.field__rules').find('li'),
    rules = {
      "一个小写字母": /[a-z]/,
      "一个大写字母": /[A-Z]/,
      "一个数字": /[0-9]/,
      "一个特殊字符": /[!@#$&*]/,
      "最小9个字符": /.{9,}/
    };

  // mark the input field if it has any value
  this.classList.toggle('hasValue', this.value);

  // itterate all the rules and validate them
  $rulesItems.each((i, elm) => {
    var valid,
      ruleName = elm.innerText.toLowerCase();

    console.log(rules, ruleName);
    if (rules[ruleName]) {
      valid = new RegExp(rules[ruleName]).test(value);

      elm.classList.toggle('pass', valid);
    }
  });
}

// show / hide password characters
function onTogglePassBtnClick() {
  var $btn = $(this),
    state = $btn.toggleClass('active').hasClass('active'),
    passwordInput = $btn.closest('.field').find('input')[0];

  passwordInput.type = state ? 'text' : 'password';
}