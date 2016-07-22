var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');

$(document).ready(function() {
  Ideas.retrieveIdeas();
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

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

var Ideas = {

  ideasArray: [],

  generateNewIdea: function(title, body) {
    var $titleInput = $('.title-input').val();
    var $bodyInput = $('.body-input').val();
    this.ideasArray.push(new Idea($titleInput, $bodyInput));
    this.storeTheArray();
  },

  remove: function(id) {
    id = parseInt(id);
    this.ideasArray = this.ideasArray.filter(function(i) {
      return i.id !== id;
    });
    this.storeTheArray();
  },

  storeTheArray: function() {
    localStorage.setItem('ideasArray', JSON.stringify(this.ideasArray));
    this.retrieveIdeas();
  },

  retrieveIdeas: function() {
    var storedIdeas = JSON.parse(localStorage.getItem('ideasArray'));
    if (storedIdeas) { this.ideasArray = storedIdeas; }
    this.ideasToPage();
  },

  ideasToPage: function() {
    $ideaContainer.html('');
    var newIdeasHtml = this.ideasArray.map(function(i) {
      return $(`
        <article class="idea" id=${i.id}>
            <header class="idea-header">
                <h3 class="idea-title">${i.title}</h3>
                <section class="idea-header-buttons">
                    <button class="remove-idea" type="button"></button>
                </section>
            </header>
            <body class="idea-body">
                <p class="idea-body">${i.body}</p>
            </body>
            <footer class="idea-footer">
                <button class="upVote" type="button"></button>
                <button class="downVote" type="button"></button>
                <p>ranking: <span class="ranking">${i.quality}</span></p>
            </footer>
        </article>`).prependTo($ideaContainer);
    });
  },

  findIdeaById: function(id) {
    return this.ideasArray.find(function (idea) {
      return idea.id === id;
    });
  },

  upVote: function(id) {
    id = parseInt(id);
    var idea = this.findIdeaById(id);
    if (idea.quality == 'plausible') {
      idea.quality = 'genius';
    }
    if (idea.quality == 'swill') {
      idea.quality = 'plausible';
    }
    this.storeTheArray()
  },

  downVote: function(id) {
    id = parseInt(id);
    var idea = this.findIdeaById(id);
    if (idea.quality == 'plausible') {
      idea.quality = 'swill';
    }
    if (idea.quality == 'genius') {
      idea.quality = 'plausible';
    }
    this.storeTheArray();
  },
};

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

// Idea.prototype.htmlLayout = function() {
//   return $(`
//     <article class="idea" id=${Ideas.newIdeasHtml.id}>
//     <header class= "idea-header">
//     <h3 class="idea-title">${Ideas.newIdeasHtml.title}</h3>
//     <section class="idea-header-buttons">
//     <button class="remove-idea" type="button"></button>
//     </section>
//     </header>
//     <body class="idea-body">
//     <p class="idea-body">${Ideas.newIdeasHtml.body}</p>
//     </body>
//     <footer class="idea-footer">
//     <button class="thumbs-up" type="button"></button>
//     <button class="thumbs-down" type="button"></button>
//     <p>ranking: <span class="ranking">${Ideas.newIdeasHtml.quality}</span></p>
//     </footer>
//     </article>`).prependTo($ideaContainer);
//   };

$ideaContainer.on('click', '.remove-idea', function() {
  var id = $(this).parents('.idea').attr('id');
  Ideas.remove(id);
});

$ideaContainer.on('click', '.upVote', function() {
  var id = $(this).parents('.idea').attr('id');
  Ideas.upVote(id);
});

$ideaContainer.on('click', '.downVote', function (){
  var id = $(this).parents('.idea').attr('id');
  Ideas.downVote();
});

$saveButton.on('click', function(event) {
  event.preventDefault();
  Ideas.generateNewIdea();
  Ideas.storeTheArray();
  Ideas.ideasToPage();
  clearInput();
});
