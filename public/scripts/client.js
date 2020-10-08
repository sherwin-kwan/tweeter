// CONSTANTS
/* For the sake of future-proofing (for example, if this app ever seeks parity with Twitter and its 280-character count), here is 
 a one-stop place to changing key constants. */

const maxChirpLength = 140;

// HELPER FUNCTIONS

// Helper function (copied from Compass) which escapes unwanted characters in a string to prevent script injections
// It borrows the jQuery "createTextNode" function (used for sanitizing the contents of HTML nodes), by creating
// a dummy div tag to encase the string. The div is not actually output as HTML.

const escapeChars = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const processTime = (date) => {
  // This function converts a Javascript date object into a "time since" label (e.g. "5 days ago")
  const now = new Date(); // creates a date object for "right now"
  if (date > now) {
    // The chirp was posted in the future by someone messing with the database
    console.log(`One or more chirps is timestamped in the future`);
    return 'Posted by a time traveller from the future';
  } else if (now - date < 86400000) {
    // The chirp was posted less than 24 hours ago
    // First check if it was posted more than 1 hour ago
    if (now - date > 3600000) {
      return `${Math.floor((now - date) / 3600000)} hours ago`;
    } else if (now - date > 60000) {
      return `${Math.floor((now - date) / 60000)} minutes ago`;
    } else if (now - date > 1000) {
      return `${Math.floor((now - date) / 1000)} seconds ago`;
    } else {
      return 'Just now';
    }
  }
  // Chirp was posted more than 24 hours ago. The function will return X days/months/years ago based on calendar months and years.
  const yearsAgo = now.getFullYear() - date.getFullYear();
  if (yearsAgo === 1) {
    return 'Last year';
  } else if (yearsAgo) {
    return `${yearsAgo} years ago`;
  };
  const monthsAgo = now.getMonth() - date.getMonth();
  if (monthsAgo === 1) {
    return 'Last month';
  } else if (monthsAgo) {
    return `${monthsAgo} months ago`;
  };
  const daysAgo = now.getDate() - date.getDate();
  if (daysAgo === 1) {
    return 'Yesterday';
  } else {
    return `${daysAgo} days ago`;
  };
}

// Takes a single chirp object formatted in JSON from the database, and returns a jQuery object containing HTML markup to display the chirp
// escapeChars is called on user-submitted fields to sanitize outputs and avoid the possibility of scripting attacks
const createChirpElement = (chirpContent) => {
  const avatar = chirpContent.user.avatars;
  const name = escapeChars(chirpContent.user.name);
  const handle = escapeChars(chirpContent.user.handle);
  const theDate = new Date(chirpContent.created_at);
  const time = processTime(theDate);
  const chirpText = escapeChars(chirpContent.content.text);
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
    <time title="${theDate}">${time}</time>
    <figure>
      <span class="emoji">🔁</span>
      <span class="emoji">💖</span>
      <span class="emoji">🙋</span>
    </figure>
  </footer>
      `);
};

// Renders a series of chirps into the appropriate space on the page with jQuery
const renderChirps = function (arrOfChirps) {
  arrOfChirps.forEach((chirp) => {
    $('#listOfChirps').prepend(createChirpElement(chirp));
  });
};

// Submitting a new chirp
const form_submit = (event, $form) => {
  event.preventDefault();
  // Begin with validating the input
  const chirpLength = $form.find('textarea').val().length;
  // Errors if chirps are blank or too long.
  if (chirpLength > maxChirpLength) {
    throw new Error(`Your message is too long. Please shorten your chirp and try again.`);
  } else if (chirpLength === 0) {
    throw new Error('Please type a chirp in the text area provided');
  };
  // Note: No validation on the input side, people can put <script> tags into the database if they want. Data is only sanitized when output and 
  // rendered onto the page.
  $.ajax('/tweets/', {
    method: 'POST',
    data: $form.serialize()
  })
    .then(() => {
      $form.find('textarea').val('');
      $form.find('.counter').val(maxChirpLength);
      load_chirps();
    })
    .fail((xhr, status, err) => {
      console.log(status, err);
    })
};

// Loads the chirps asynchronously from database
const load_chirps = () => {
  $.ajax('/tweets/', { method: 'GET' })
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
