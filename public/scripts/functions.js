/* Table of Contents
1. Constants Definition
2. Character Counter
3. Functions for Rendering Chirps
4. Functions for Submitting Chirps
*/


// CONSTANTS
/* For the sake of future-proofing (for example, if this app ever seeks parity with Twitter and its 280-character count), here is
 a one-stop place to changing key constants. */

const maxChirpLength = 140;



// CHARACTER COUNTER

// Character counter to ensure no more than maximum allowable (140) characters are typed

const changeCounter = ($textarea, $counterToChange, maxChars) => {
  let charsRemaining = maxChars - $textarea.val().length;
  $counterToChange.val(charsRemaining);
  const counterTooltip = (charsRemaining >= 0) ? `${charsRemaining} characters remaining` : `${-charsRemaining} characters over the limit`;
  $counterToChange.attr('title', counterTooltip);
  if (charsRemaining < 0) {
    $counterToChange.css('color', 'red');
  } else {
    $counterToChange.css('color', 'black');
  }
};






// RENDERING CHIRPS

// Escaping and Sanitizing
// Helper function (copied from Compass) which escapes unwanted characters in a string to prevent script injections
// It borrows the jQuery "createTextNode" function (used for sanitizing the contents of HTML nodes), by creating
// a dummy div tag to encase the string. The div is not actually output as HTML.

const escapeChars = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Convert a Javascript date object into a "time since" label (e.g. "5 days ago")

const processTime = (date) => {
  const now = new Date(); // creates a date object for "right now"
  if (date > now) {
    // The chirp is timestamped in the future
    return 'Posted by a time traveller from the future';
  } else if (now - date < 86400000) {
    // The chirp was posted less than 24 hours ago
    // First check if it was posted more than 1 hour ago
    if (now - date > 3600000) {
      return `${Math.floor((now - date) / 3600000)} hours ago`;
    } else if (now - date > 60000) { // Minutes
      return `${Math.floor((now - date) / 60000)} minutes ago`;
    } else if (now - date > 1000) { // Seconds
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
  }
  const monthsAgo = now.getMonth() - date.getMonth();
  if (monthsAgo === 1) {
    return 'Last month';
  } else if (monthsAgo) {
    return `${monthsAgo} months ago`;
  }
  const daysAgo = now.getDate() - date.getDate();
  if (daysAgo === 1) {
    return 'Yesterday';
  } else {
    return `${daysAgo} days ago`;
  }
};

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
     <div class="name" title="A random name and avatar image has been generated. In a future version of Chirper, you will be able to register accounts and personalize these."><img class="avatar" width="50px" height="50px" src="${avatar}">${name}</div>
     <address>${handle}</address>
   </header>
   <p>
     ${chirpText}
   </p>
   <footer>
     <time title="${theDate}">${time}</time>
     <figure>
       <span class="emoji" title="re-chirp">🔁</span>
       <span class="emoji" title="favourite">💖</span>
       <span class="emoji" title="reply">🙋</span>
       <span class="emoji" title="flag">🚩</span>
     </figure>
   </footer>
       `);
};

// Loads the chirps asynchronously from database and renders them onto the page. If onlyOne is set to true, only the most recent chirp
// is loaded. If false or missing, all chirps are loaded.
const load_chirps = (onlyOne) => {
  const $listOfChirps = $('#listOfChirps');
  $.ajax('/tweets/', { method: 'GET' })
    .then((arrOfChirps) => {
      if (onlyOne) {
        $listOfChirps.prepend(createChirpElement(arrOfChirps[arrOfChirps.length - 1]));
      } else {
        arrOfChirps.forEach((chirp) => {
          // Note: Prepend used to ensure newest posts appear at the top
          $listOfChirps.prepend(createChirpElement(chirp));
        });
      }
    })
    .fail((xhr, status, err) => {
      $listOfChirps.find('p').text(`${status}, ${err}: Unfortunately, chirps could not be loaded. Please try again later or report a bug using
      the link in the footer.`);
    });
};



// SUBMITTING NEW CHIRPS

const form_submit = (event, $form) => {
  event.preventDefault();
  // Begin with validating the input
  const chirpLength = $form.find('textarea').val().length;
  // Errors if chirps are blank or too long.
  if (chirpLength > maxChirpLength) {
    throw new Error(`Your message is too long. Please shorten your chirp and try again.`);
  } else if (chirpLength === 0) {
    throw new Error('Please type a chirp in the text area provided');
  }
  // Note: No validation on the input side, people can put <script> tags into the database if they want. Data is only sanitized when output and
  // rendered onto the page.
  $.ajax('/tweets/', {
    method: 'POST',
    data: $form.serialize()
  })
    .then(() => {
      $form.find('textarea').val('');
      $form.find('.counter').val(maxChirpLength);
      $form.find('p').text('');
      load_chirps(true);
    })
    .fail((xhr, status, err) => {
      throw new Error(`Unforutnately, your chirp could not be saved to the database. Please try again later or report a bug using
      the link in the footer`);
    })
};
