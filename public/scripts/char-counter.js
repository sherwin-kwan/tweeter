// Character counter to ensure no more than 300 characters are typed

const changeCounter = (event, $counterToChange, maxChars) => {
  console.log('This is: ' + this);
  let charsRemaining = maxChars - event.target.value.length;
  $counterToChange.val(charsRemaining);
  if (charsRemaining <= 0) {
    $counterToChange.css('color', 'red');
  };
};

// Wrap it to ensure code only runs when document is "ready".
$(function () {
  const $chirpTextArea = $('#chirpTextArea');
  const $counter = $chirpTextArea.next('.submitDiv').find('.counter');
  $chirpTextArea[0].placeholder = 'Friendship ended with Twitter. Now Chirper is my best friend';
  $chirpTextArea.on('input', function (event) {
    changeCounter(event, $counter, 300);
  });
});
