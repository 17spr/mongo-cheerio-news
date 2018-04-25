// rendering all articles from the database
$.getJSON("/articles", function(data) {
    for (var i =0; i < data.length; i++) {
        $("#articles").append(`<p data-id="${data[i]._id}">${data[i].headline}<br />${data[i].link}</p>`);
    }
});


$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#comment").empty();
    var thisId = $(this).attr("data-id");
  
    // Ajax call for the Article
    $.ajax({
      method: "GET",
      url: `/articles/${thisId}`
    })
        .then(function(data) {
            console.log(data);
            $("#comment").append(`<h2>${data.title}</h2>`);
            $("#comment").append("<input id='titleinput' name='title' >");
            $("#comment").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#comment").append(`<button data-id="${data._id}" id="savenote">Save Note</button>`);

            if (data.comment) {
                $("#titleinput").val(data.comment.title);
                $("#bodyinput").val(data.comment.body);
              }

        });

});