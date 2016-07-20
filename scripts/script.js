//adds buttons for quality
//sets quality by default to 'swill'
// we want the array to be passed to local storage

var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');
var ideasArray = [];
var storedIdeas = JSON.parse(localStorage.getItem("ideasArray"));

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

  ideasArray.push(idea);

  $(`
    <article class="idea" id=${idea.uniqueId}>
      <header class= "idea-header">
        <h3 class="idea-title">${idea.title}</h3>
          <section class="idea-header-buttons">
            <button class="remove-idea" type="button">X</button>
          </section>  
      </header>
      <body class="idea-body">
        <p class="idea-body">${idea.body}</p>
        <button class="thumbs-up" type="button">TU</button>
        <button class="thumbs-down" type="button">TD</button>
      </body>
      <footer class="idea-footer">

      </footer>
    </article>`).prependTo($ideaContainer);
}

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

function storeTheArray() {
  localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
}
//to set array into localstorage we
//JSON Stringify the ideasArray
//localstorage.set(JSON Stringify ideasArray)

$ideaContainer.on('click', '.remove-idea', function() {
  $(this).closest('article').remove();
});
