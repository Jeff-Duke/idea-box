var $titleInput = $('.title-input');
var $bodyInput = $('.body-input');
var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');

//make a new function for handling ideas
//add idea function
  // takes titleInput and bodyInput, creates a new article, prepends the idea-container with the new idea.
    //adds buttons for quality
    //sets quality by default to 'swill'
    //sets a unique ID on the idea
    //clears both inputs (new fn)
    // we want the idea to be passed to local storage


$saveButton.on('click', function(event) {
  event.preventDefault();

  $titleInput = $titleInput.val();
  $bodyInput = $bodyInput.val();

  function newIdea() {
    $(`
      <article class="idea">
        <h3>${$titleInput}</h3>
        <p>${$bodyInput}</p>
      </article>`).prependTo($ideaContainer);
  }

  newIdea();
});
