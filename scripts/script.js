var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');
var ideasArray = [];

$(document).ready(function() {
  var storedIdeas = JSON.parse(localStorage.getItem('ideasArray'));
  if (storedIdeas) { ideasArray = storedIdeas; }
  ideasToPage();
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

  storeTheArray();
  ideasToPage();
}
function storeTheArray() {
  localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
}

function ideasToPage() {
  for (var i = 0; i < ideasArray.length; i++) {
    var storedIdea = ideasArray[i];

    $(`
      <article class="idea" id=${storedIdea.id}>
        <header class= "idea-header">
          <h3 class="idea-title">${storedIdea.title}</h3>
            <section class="idea-header-buttons">
              <button class="remove-idea" type="button"></button>
            </section>
        </header>
        <body class="idea-body">
          <p class="idea-body">${storedIdea.body}</p>
        </body>
        <footer class="idea-footer">
          <button class="thumbs-up" type="button"></button>
          <button class="thumbs-down" type="button"></button>
          <p>ranking: <span class="ranking">${storedIdea.quality}</span></p>
        </footer>
      </article>`).prependTo($ideaContainer);
  }
}

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

function thumbsUpRanking() {
  var $ideaElement = $(this).parents('.idea-footer');
  var $rankingElement = $ideaElement.find('.ranking');

  if ($rankingElement.text() == 'plausible') {
    $rankingElement.text('genius');
  }
  if ($rankingElement.text() == 'swill') {
    $rankingElement.text('plausible');
  }

}

function thumbsDownRanking() {
  var $ideaElement = $(this).parents('.idea-footer');
  var $rankingElement = $ideaElement.find('.ranking');

  if ($rankingElement.text() == 'plausible') {
    $rankingElement.text('swill');
  }
  if ($rankingElement.text() == 'genius') {
    $rankingElement.text('plausible');
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

$(document).ready(function() {
  $('.search-input').keyup(function() {
    var filter = $(this).val();
    $('.idea').each(function() {
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
      }
    });
  });
});
