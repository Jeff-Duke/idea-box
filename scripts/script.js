var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');
var ideasArray = [];

$(document).ready(function() {
  var storedIdeas = JSON.parse(localStorage.getItem('ideasArray'));
  if (storedIdeas) {
    ideasArray = storedIdeas;
  }
});

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function generateNewIdea() {
  var $titleInput = $('.title-input').val();
  var $bodyInput = $('.body-input').val();
  var idea = new Idea($titleInput, $bodyInput);

  ideasArray.push(idea);

  $(`
    <article class="idea" id=${idea.id}>
      <header class= "idea-header">
        <h3 class="idea-title">${idea.title}</h3>
          <section class="idea-header-buttons">
            <button class="remove-idea" type="button">X</button>
          </section>
      </header>
      <body class="idea-body">
        <p class="idea-body">${idea.body}</p>
      </body>
      <footer class="idea-footer">
        <button class="thumbs-up" type="button">TU</button>
        <button class="thumbs-down" type="button">TD</button>
        <p>ranking: <span class="ranking">${idea.quality}</span></p>
      </footer>
    </article>`).prependTo($ideaContainer);
    storeTheArray();
}

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

function storeTheArray() {
  localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
}
//to set array into localstorage
//JSON Stringify the ideasArray
//localstorage.set(JSON Stringify ideasArray)

function thumbsUpRanking() {
  var $ideaElement = $(this).parents('.idea');
  var $rankingElement = $ideaElement.find('.ranking');
  var ranking = $('.ranking').text();
  if (ranking == 'swill') {
    $rankingElement.text('plausible')
  }
  if (ranking == 'plausible') {
    $rankingElement.text('genius');
  }
}

function thumbsDownRanking() {
  var $ideaElement = $(this).parents('.idea');
  var $rankingElement = $ideaElement.find('.ranking');
  var ranking = $('.ranking').text();
  if (ranking == 'genius') {
    $rankingElement.text('plausible')
  }
  if (ranking == 'plausible') {
    $rankingElement.text('swill');
  }
}

$saveButton.on('click', function(event) {
  event.preventDefault();
  generateNewIdea();
  clearInput();
});

$ideaContainer.on('click', '.remove-idea', function() {
  $(this).closest('article').remove();
});

$ideaContainer.on('click', '.thumbs-up', thumbsUpRanking);

$ideaContainer.on('click', '.thumbs-down', thumbsDownRanking);
