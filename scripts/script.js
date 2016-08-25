var $titleInput = $('.title-input');
var $bodyInput = $('.body-input');
var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');
var $sortButton = $('.sort-button');

$(document).ready(function() {
  IdeaBox.pageLoad();
  //Search bar event listener:
  $searchInput.keyup(function() {
    var filter = $(this).val();
    $('.idea').each(function() {
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      }
      else {
        $(this).fadeIn();
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
  counter: 0,

  ideasArray: [],

  generateNewIdea: function(title, body) {
    this.ideasArray.unshift(new Idea($titleInput.val(), $bodyInput.val()));
    this.storeTheArray();
  },

  storeTheArray: function() {
    localStorage.setItem('ideasArray', JSON.stringify(this.ideasArray));
    this.retrieveIdeas();
  },

  retrieveIdeas: function() {
    var storedIdeas = JSON.parse(localStorage.getItem('ideasArray'));
    if (storedIdeas) {
      this.ideasArray = storedIdeas.map(function(i) {
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
    return this.ideasArray.find(function(idea) {
      return idea.id === id;
    });
  },

  removeIdea: function(id) {
    id = parseInt(id);
    this.ideasArray = this.ideasArray.filter(function(i) {
      return i.id !== id;
    });
    this.storeTheArray();
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

  editTitle: function(id, newTitle) {
    id = parseInt(id);
    var idea = this.findIdeaById(id);
    idea.title = newTitle;
    this.storeTheArray();
  },

  editBody: function(id, newBody) {
    id = parseInt(id);
    var idea = this.findIdeaById(id);
    idea.body = newBody;
    this.storeTheArray();
  },

  sortByQuality: function(array, key) {
    if (this.counter % 2 === 0) {
      $sortButton.text('Low-High');
      this.positiveSorter(this.ideasArray);
    }
    else {
      $sortButton.text('High-Low');
      this.negativeSorter(this.ideasArray);
    }
  },

  positiveSorter: function(arr) {
    return arr.sort(function(a, b) {
      return ((a.quality < b.quality) ? -1 : ((a.quality > b.quality) ? 1 : 0 ));
    });
  },

  negativeSorter: function(arr) {
    return arr.sort(function(a, b) {
      return ((a.quality > b.quality) ? -1 : ((a.quality < b.quality) ? 1 : 0 ));
    });
  },

  sortById: function() {
    return this.ideasArray.sort(function(a, b) {
      return ((a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0 ));
    });
  },

  pageLoad: function() {
    this.retrieveIdeas();
    this.sortById();
    this.storeTheArray();
  }
};

function clearInput() {
  $titleInput.val('');
  $bodyInput.val('');
  $titleInput.focus();
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
            <p><span class="ranking">quality: </span>${this.quality}</p>
        </footer>
    </article>`)
};

$saveButton.on('click', function(event) {
  event.preventDefault();
  IdeaBox.generateNewIdea();
  IdeaBox.storeTheArray();
  IdeaBox.ideasToPage();
  clearInput();
});

$ideaContainer.on('click', '.remove-idea', function() {
  var id = $(this).parents('.idea').attr('id');
  IdeaBox.removeIdea(id);
});

$ideaContainer.on('click', '.upVote', function() {
  var id = $(this).parents('.idea').attr('id');
  IdeaBox.upVote(id);
});

$ideaContainer.on('click', '.downVote', function() {
  var id = $(this).parents('.idea').attr('id');
  IdeaBox.downVote(id);
});

$ideaContainer.on('focusout', '.idea-title', function() {
  var id = $(this).parents('.idea').attr('id');
  var newTitle = $(this).text();
  IdeaBox.editTitle(id, newTitle);
});

$ideaContainer.on('keyup', '.idea-title', function(e) {
  if(e.which == 13) {
    $(this).focusout();
  }
});

$ideaContainer.on('focusout', '.idea-body', function() {
  var id = $(this).parents('.idea').attr('id');
  var newBody = $(this).text();
  IdeaBox.editBody(id, newBody);
});

$ideaContainer.on('keyup', '.idea-body', function(e) {
  if(e.which == 13) {
    $(this).focusout();
  }
});

$sortButton.on('click', function() {
  IdeaBox.sortByQuality();
  IdeaBox.storeTheArray();
  IdeaBox.counter += 1;
});
