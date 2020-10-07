/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* LOADING CHIRPS ONTO THE PAGE */

const escape = require('./helpers.js').escapeChars;

// Takes a single chirp object formatted in JSON from the database, and returns a jQuery object containing HTML markup to display the chirp
const createChirpElement = (chirpContent) => {
  const avatar = chirpContent.user.avatars;
  const name = escape(chirpContent.user.name);
  const handle = escape(chirpContent.user.handle);
  const time = chirpContent.created_at;
  const chirpText = escape(chirpContent.content.text);
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
  if (chirpLength > 300) {
    throw new Error(`Your message is too long. Please shorten your chirp and try again.`);
  } else if (chirpLength === 0) {
    throw new Error('Please type a chirp in the text area provided');
  };
  console.log($form.serialize()); // This is unsafe as the form could contain chracters used for XSS
  $.ajax('/tweets/', { 
    method: 'POST', 
    data: $form.serialize()
   })
    .then(console.log('Posted'))
    .fail((xhr, status, err) => {
      console.log(status, err);
    })
}

const load_chirps = () => {
  $.ajax('/tweets/', {method: 'GET'})
  .then((res) => renderChirps(res))
  .fail((xhr, status, err) => {
    console.log(status, err);
  })
}

$(function () {
  // Renders chirps on document ready
  load_chirps();
  // Handler for submitting the new chirp form.
  const $chirpForm = $('#chirpForm');
  $chirpForm.submit(function (event) {
    // Pass two arguments to form_submit function: the event, and the jQuery wrapper for the new chirp form
    form_submit(event, $(this));
    load_chirps();
  });
});
