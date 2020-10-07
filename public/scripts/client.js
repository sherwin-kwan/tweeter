/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* function to produce HTML for chirps */

/*
<article>
  <header>
    <div class="name"><img class="avatar" height="50px" width="50px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/800px-Abraham_Lincoln_O-77_matte_collodion_print.jpg">Abraham Lincoln</div>
    <address>@honestabe</address>
  </header>
  <p>
    Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.
    And two dozen and one years ago, I started slaying vampires.
  </p>
  <footer>
    <time>157 years ago</time>
    <figure>
      <span class="emoji">🔁</span>
      <span class="emoji">💖</span>
      <span class="emoji">🙋</span>
    </figure>
  </footer>
</article>*/

const createChirpElement = (chirpContent) => {
  const avatar = chirpContent.user.avatars;
  const name = chirpContent.user.name;
  const handle = chirpContent.user.handle;
  const time = chirpContent.created_at;
  const chirpText = chirpContent.content.text;
  return $(`
  <article>
  <header>
    <div class="name"><img class="avatar" src="${avatar}">${name}</div>
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

const testObject1 = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png"
    ,
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(function() {
  const $chirp = $('#listOfChirps');
  $chirp.append(createChirpElement(testObject1));
})
