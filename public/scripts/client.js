/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* LOADING CHIRPS ONTO THE PAGE */

// Helper function which escapes unwanted characters in a string to prevent script injections
// It borrows the jQuery "createTextNode" function (used for sanitizing the contents of HTML nodes), by creating
// a dummy div tag to encase the string. The div is not actually output as HTML.
const escapeChars =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Takes a single chirp object formatted in JSON from the database, and returns a jQuery object containing HTML markup to display the chirp
const createChirpElement = (chirpContent) => {
  const avatar = chirpContent.user.avatars;
  const name = escapeChars(chirpContent.user.name);
  const handle = escapeChars(chirpContent.user.handle);
  const time = chirpContent.created_at;
  const chirpText = escapeChars(chirpContent.content.text);
  console.log(name, handle, chirpText);
  return $(`
  <article>
  <header>
    <div class="name"><img class="avatar" width="50px" height="50px" src="${avatar}">${name}</div>
    <address>${handle}</address>
  </header>
  <p>
    ${chirpText}
  </p>
  <footer>
    <time>${time}</time>
    <figure>
      <span class="emoji">🔁</span>
      <span class="emoji">💖</span>
      <span class="emoji">🙋</span>
    </figure>
  </footer>
      `);
};

// Renders a series of chirps with jQuery
const renderChirps = function (arrOfChirps) {
  arrOfChirps.forEach((chirp) => {
    $('#listOfChirps').prepend(createChirpElement(chirp));
  });
};

const form_submit = (event, $form) => {
  event.preventDefault();
  // Begin with validating the input
  const chirpLength = $form.find('textarea').val().length;
  console.log(chirpLength);
  // Errors if chirps are blank or too long.
  if (chirpLength > 300) {
    throw new Error(`Your message is too long. Please shorten your chirp and try again.`);
  } else if (chirpLength === 0) {
    throw new Error('Please type a chirp in the text area provided');
  };
  console.log($form.serialize());
  // Note: No validation on the input side, people can put <script> tags into the database if they want. Data is only sanitized when output and 
  // rendered onto the page.
  $.ajax('/tweets/', { 
    method: 'POST', 
    data: $form.serialize()
   })
    .then(load_chirps)
    .fail((xhr, status, err) => {
      console.log(status, err);
    })
};

// Loads the chirps asynchronously from database
const load_chirps = () => {
  $.ajax('/tweets/', {method: 'GET'})
  .then((res) => renderChirps(res))
  .fail((xhr, status, err) => {
    console.log(status, err);
  })
};

$(function () {
  // Renders chirps on document ready
  load_chirps();
  // Handler for submitting the new chirp form.
  const $chirpForm = $('#chirpForm');
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
