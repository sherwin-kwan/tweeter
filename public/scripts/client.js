
$(function () {
  // RUNS ON DOCUMENT READY

  // Define variables (with $ to signify jQuery object) for key nodes in the DOM
  const $chirpTextArea = $('#chirpTextArea');
  const $counter = $chirpTextArea.next('.submitDiv').find('.counter');
  const $chirpForm = $('#chirpForm');


  // Render chirps for the first time
  load_chirps();

  // Initialize placeholder message for the textarea
  $chirpTextArea[0].placeholder = 'Friendship ended with Twitter. Now Chirper is my best friend';
  // Initialize the counter to 140 characters
  changeCounter($chirpTextArea, $counter, maxChirpLength);


  // EVENT LISTENERS
  // Be ready to listen for inputs in the textarea and change the counter number
  $chirpTextArea.on('input', function (event) {
    changeCounter($chirpTextArea, $counter, maxChirpLength);
  });
  $chirpForm.on('submit', function (event) {
    // Pass two arguments to form_submit function: the event, and the jQuery wrapper for the new chirp form
    try { // In case validation errors happen
      console.log('Attempting to submit form');
      form_submit(event, $(this));
    } catch (err) {
      console.log('Error');
      $(this).find('.submitDiv p').text(err.message);
    };
  });


});

