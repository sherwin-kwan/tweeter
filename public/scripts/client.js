/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* functions to produce HTML for chirps */

// Takes a single chirp object formatted in JSON from the database, and returns a jQuery object containing HTML markup to display the chirp
const createChirpElement = (chirpContent) => {
  const avatar = chirpContent.user.avatars;
  const name = chirpContent.user.name;
  const handle = chirpContent.user.handle;
  const time = chirpContent.created_at;
  const chirpText = chirpContent.content.text;
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

// This is a temporary storage for the data until the in-memory database can be linked properly
const data = [
  {
    "user": {
      "name": "Abraham Lincoln",
      "avatars": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/800px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
      "handle": "@HonestAbe"
    },
    "content": {
      "text": "Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.\
      And three dozen years ago, I started hunting vampires."
    },
    "created_at": 0
  },
  {
    "user": {
      "name": "George Harrison",
      "avatars": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/George_Harrison_1974.jpg/690px-George_Harrison_1974.jpg",
      "handle": "@GeorgeH"
    },
    "content": {
      "text": "Here comes the sun, and I say it's alright #harekrishna"
    },
    "created_at": 0
  },
  {
    "user": {
      "name": "Jules",
      "avatars": "https://i.pinimg.com/originals/38/80/be/3880be0b24e775a7f47402687421d533.jpg",
      "handle": "@royalewithcheese"
    },
    "content": {
      "text": "Say 'what' again. Say 'what' again, I dare you, I double dare you motherfucker, say what one more Goddamn time!"
    },
    "created_at": 778377600
  }
]

// Renders a series of chirps with jQuery
const renderChirps = function (arrOfChirps) {
  arrOfChirps.forEach((chirp) => {
    $('#listOfChirps').prepend(createChirpElement(chirp));
  });
};

const form_submit = (event, $form) => {
  event.preventDefault();
  console.log('Submitting: ' + $form.serialize());
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
  renderChirps(data);
  // Handler for submitting the new chirp form.
  const $chirpForm = $('#chirpForm');
  $chirpForm.submit(function (event) {
    // Pass two arguments to form_submit function: the event, and the jQuery wrapper for the new chirp form
    form_submit(event, $(this));
    load_chirps();
  });
});
