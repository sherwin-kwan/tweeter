// Character counter to ensure no more than maximum allowable (140) characters are typed

const changeCounter = ($textarea, $counterToChange, maxChars) => {
  console.log('This is: ' + this);
  let charsRemaining = maxChars - $textarea.val().length;
  $counterToChange.val(charsRemaining);
  if (charsRemaining < 0) {
    $counterToChange.css('color', 'red');
  } else {
    $counterToChange.css('color', 'black');
  }
};

// Wrap it to ensure code only runs when document is "ready".
$(function () {
  const $chirpTextArea = $('#chirpTextArea');
  const $counter = $chirpTextArea.next('.submitDiv').find('.counter');
  $chirpTextArea[0].placeholder = 'Friendship ended with Twitter. Now Chirper is my best friend';
  // Place the number in on document ready
  changeCounter($chirpTextArea, $counter, maxChirpLength);
  // Be ready to listen for inputs in the textarea and change the counter number
  $chirpTextArea.on('input', function (event) {
    changeCounter($chirpTextArea, $counter, maxChirpLength);
  });
});
