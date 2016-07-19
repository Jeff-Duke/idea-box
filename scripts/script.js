//make a new function for handling ideas
//add idea function
// takes titleInput and bodyInput, creates a new article, prepends the idea-container with the new idea.
//adds buttons for quality
//sets quality by default to 'swill'
//sets a unique ID on the idea
// we want the idea to be passed to local storage
//function createIdea(uniqueID, title, body, quality)

var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');

$saveButton.on('click', function(event) {
  event.preventDefault();

  generateNewIdea();
  clearInput();
});

function Idea(uniqueId, title, body) {
  this.uniqueId = uniqueId;
  this.title = title;
  this.body = body;
}

function generateNewIdea() {
  var $titleInput = $('.title-input').val();
  var $bodyInput = $('.body-input').val();
  var $uniqueId = Date.now();
  var idea = new Idea($uniqueId , $titleInput, $bodyInput);

  $(`
    <article class="idea" id=${idea.uniqueId}>
      <h3>${idea.title}</h3>
      <button class="remove-idea" type="button">X</button>
      <p>${idea.body}</p>
      <button class="thumbs-up" type="button">TU</button>
      <button class="thumbs-down" type="button">TD</button>
    </article>`).prependTo($ideaContainer);
}

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

$ideaContainer.on('click', '.remove-idea', function() {
  $(this).closest('article').remove();
});
