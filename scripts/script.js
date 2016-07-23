var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');

$(document).ready(function() {
  IdeaBox.retrieveIdeas();
//Setup the search bar:
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

function Idea(title, body, id = Date.now(), quality = 'swill') {
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.id = id;
}

var IdeaBox = {

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
    if (storedIdeas) {
      this.ideasArray = storedIdeas.map(function (i) {
        return new Idea(i.title, i.body, i.id, i.quality);
      });
    }
    this.ideasToPage();
  },

  ideasToPage: function() {
    $ideaContainer.html('');
    $ideaContainer.prepend(this.ideasArray.map(function(i) {
      return i.htmlLayout();
    }));
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
    this.storeTheArray();
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

Idea.prototype.htmlLayout = function() {
  return $(`
    <article class="idea" id=${this.id}>
        <header class="idea-header">
            <h3 class="idea-title" contenteditable="true">${this.title}</h3>
            <section class="idea-header-buttons">
                <button class="remove-idea" type="button"></button>
            </section>
        </header>

        <body class="idea-body">
            <p class="idea-body" contenteditable="true">${this.body}</p>
        </body>
        <footer class="idea-footer">
            <button class="btn upVote" type="button"></button>
            <button class="btn downVote" type="button"></button>
            <p>ranking: <span class="ranking">${this.quality}</span></p>
        </footer>
    </article>`)
  };

$ideaContainer.on('click', '.remove-idea', function() {
  var id = $(this).parents('.idea').attr('id');
  IdeaBox.remove(id);
});

$ideaContainer.on('click', '.upVote', function() {
  var id = $(this).parents('.idea').attr('id');
  IdeaBox.upVote(id);
});

$ideaContainer.on('click', '.downVote', function () {
  var id = $(this).parents('.idea').attr('id');
  IdeaBox.downVote(id);
});

$saveButton.on('click', function(event) {
  event.preventDefault();
  IdeaBox.generateNewIdea();
  IdeaBox.storeTheArray();
  IdeaBox.ideasToPage();
  clearInput();
});
