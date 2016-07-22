var $saveButton = $('.save-button');
var $searchInput = $('.search-input');
var $ideaContainer = $('.idea-container');

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
    // $ideaContainer.on('click', '.remove-idea', function() {
    //   $(this).closest('article').remove();
    this.ideasArray = this.ideasArray.filter(function(i) {
      return i.id !== id;
    });
  },

  storeTheArray: function() {
    localStorage.setItem('ideasArray', JSON.stringify(this.ideasArray));
    this.ideasToPage();
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
    })
  },

  findIdeaById: function(id) {
    return this.ideasArray.find(function (idea) {
      return idea.id === id;
    });
  },

  upVote: function() {
    var $rankingElement = $('.ranking');
    var ranking = $rankingElement.text();
    if (ranking == 'plausible') {
      $rankingElement.text('genius');
    }
    if (ranking == 'swill') {
      $rankingElement.text('plausible');
    }
  },

  downVote: function(id) {
    var id = this.id;
    var $rankingElement = $('.ranking');
    var ranking = $rankingElement.text();
    if (ranking == 'plausible') {
      $rankingElement.text('swill');
    }
    if (ranking == 'genius') {
      $rankingElement.text('plausible');
    }
  },
};

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

// Idea.prototype.upVote = function() {
//   var $ideaElement = $(this).parents('.idea-footer');
//   var $rankingElement = $ideaElement.find('.ranking');
//   var ranking = $rankingElement.text();
  // if (ranking == 'plausible') {
  //   $rankingElement.text('genius');
  // }
  // if (ranking == 'swill') {
  //   $rankingElement.text('plausible');
  // }
// };

$ideaContainer.on('click', '.upVote', function() {
  var id = $(this).parents('.idea-footer').attr('id');
  var idea = Ideas.findIdeaById(id);
  Ideas.upVote();
})

$ideaContainer.on('click', '.downVote', function (){
  var id = $(this).parents('.idea-footer').attr('id');
  var idea = Ideas.findIdeaById(id);
  Ideas.downVote();
})

// Idea.prototype.downVote = function() {
  // var $ideaElement = $(this).parents('.idea-footer');
  // var $rankingElement = $ideaElement.find('.ranking');
  // var ranking = $rankingElement.text();
  // if (ranking == 'plausible') {
  //   $rankingElement.text('swill');
  // }
  // if (ranking == 'genius') {
  //   $rankingElement.text('plausible');
  // }
// };

// $ideaContainer.on('click', '.thumbs-up', thumbsUpRanking);

// $ideaContainer.on('click', '.thumbs-down', thumbsDownRanking);

$saveButton.on('click', function(event) {
  event.preventDefault();
  Ideas.generateNewIdea();
  Ideas.storeTheArray();
  Ideas.ideasToPage();
  clearInput();
});

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

// function findIdeaById() {
//   var id = Date.now();
//   for (var i = 0; i < ideasArray.length; i++) {
//     if (ideasArray[i].id === id) {
//       ideasArray.splice(i, 1);
//       localStorage.removeItem();
//     }
//   }
// }

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
