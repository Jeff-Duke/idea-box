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
  var $ideaElement = $(this).parent('.idea-footer');
  var $rankingElement = $ideaElement.siblings('.ranking');
  var ranking = $('.ranking').text();
  if (ranking == 'swill') {
    $rankingElement.text('plausible');
  }
  if (ranking == 'plausible') {
    $rankingElement.text('genius');
  }
}

function thumbsDownRanking() {
  var $ideaElement = $(this).parent('.idea-footer');
  var $rankingElement = $ideaElement.siblings('.ranking');
  var ranking = $('.ranking').text();
  if (ranking == 'genius') {
    $rankingElement.text('plausible');
  }
  if (ranking == 'plausible') {
    $rankingElement.text('swill');
  }
}

// function updateIdeaQuality() {
//   for (var i = 0; i < ideasArray.length; i++) {
//     var storedIdea = ideasArray[i];
// }

$saveButton.on('click', function(event) {
  event.preventDefault();
  generateNewIdea();
  clearInput();
});

//need to make id equal to the random number date.now() creates
//remove idea from array, localStorage, and page
$ideaContainer.on('click', '.remove-idea', function() {
  $(this).closest('article').remove();
  findIdeaById();
});

function findIdeaById() {
  var id = Date.now();
  for (var i = 0; i < ideasArray.length; i++) {
    if (ideasArray[i].id === id) {
      ideasArray.splice(i, 1);
      localStorage.removeItem();
    }
  }
}

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
