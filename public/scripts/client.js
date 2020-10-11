// This file contains functions that run on page load or when an event triggers.
// Helper functions are found in ./functions.js



$(function() {
  // RUNS ON DOCUMENT READY

  // CONSTANTS
  // Define variables (with $ to signify jQuery object) for key nodes in the DOM
  const $chirpTextArea = $('#chirpTextArea');
  const $counter = $chirpTextArea.next('.submitDiv').find('.counter');
  const $chirpForm = $('#chirpForm');
  const $composeButton = $('nav button');
  const $formWrapper = $('#formWrapper');
  //
  //


  // ON INITIAL PAGE LOAD
  // Render chirps for the first time
  load_chirps();

  // Initialize placeholder message for the textarea
  $chirpTextArea[0].placeholder = 'Friendship ended with Twitter. Now Chirper is my best friend';

  // Initialize the counter to 140 characters
  changeCounter($chirpTextArea, $counter, maxChirpLength);
  //
  //



  // EVENT LISTENERS


  // 1) Listen for clicking the button to compose new chirp
  $composeButton.on('click', function() {
    // Up/down sliding motion to reveal the textarea
    if ($formWrapper.is(':visible')) {
      $formWrapper.slideUp(500);
    } else {
      $formWrapper.slideDown(500);
    }
  })

  // 2) Listen for inputs in the textarea and change the counter number
  $chirpTextArea.on('input', () => {
    changeCounter($chirpTextArea, $counter, maxChirpLength);
  });

  // 3) Listen for submission of new chirps
  $chirpForm.on('submit', function (event) {
    // Pass two arguments to form_submit function: the event, and the jQuery wrapper for the new chirp form
    try { // In case validation errors happen
      form_submit(event, $(this));
    } catch (err) {
      $(this).find('.submitDiv p').text(err.message);
    }
  });
  
});

