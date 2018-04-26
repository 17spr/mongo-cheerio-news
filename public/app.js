// rendering all articles from the database
$.getJSON("/articles", function(data) {
    for (var i =0; i < data.length; i++) {
        $("#articles").append(`<p data-id="${data[i]._id}">${data[i].headline}<br />${data[i].summary}<br />${data[i].link}</p>`);
    }
});

// clicking on article allows user to add a comment to it
$(document).on("click", "p", function() {
    // Empty the comments from the comment section
    $("#comment").empty();
    var thisId = $(this).attr("data-id");

  
    // Ajax call for the Article
    $.ajax({
      method: "GET",
      url: `/articles/${thisId}`
    })
        .then(function(data) {
            console.log(data);
            $("#comment").append("<h2>Comments</h2>");
            $("#comment").append(`<h2>${data.headline}</h2>`);
            $("#comment").append("<input id='titleinput' name='title' placeholder='comment title'>");
            $("#comment").append("<textarea id='bodyinput' name='body' placeholder='comments'></textarea>");
            $("#comment").append(`<button data-id="${data._id}" id="savecomment">Save Comment</button>`);

            if (data.comment) {
                $("#titleinput").val(data.comment.title);
                $("#bodyinput").val(data.comment.body);
              }

        });
});

// saving comment to Comment collection in Mongo database 
$(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

