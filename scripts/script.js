//var $titleInput = $('.title-input');
//var $bodyInput = $('.body-input');
var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');

//make a new function for handling ideas
//add idea function
  // takes titleInput and bodyInput, creates a new article, prepends the idea-container with the new idea.
    //adds buttons for quality
    //sets quality by default to 'swill'
    //sets a unique ID on the idea
    // we want the idea to be passed to local storage


$saveButton.on('click', function(event) {
  event.preventDefault();

  $titleInput = $('.title-input').val();
  $bodyInput = $('.body-input').val();
  var uniqueId = Date.now();

  function newIdea() {
    $(`
      <article class="idea" id=`+ uniqueId +`>
        <h3>${$titleInput}</h3>
        <button class="remove-idea" type="button">X</button>
        <p>${$bodyInput}</p>
        <button class="thumbs-up" type="button">TU</button>
        <button class="thumbs-down" type="button">TD</button>
      </article>`).prependTo($ideaContainer);
  }

  newIdea();
  clearInput();
});

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

$ideaContainer.on('click', '.remove-idea', function() {
  $(this).closest('article').remove();
});
