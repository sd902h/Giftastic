

var topics = ["Dogs", "Cats", "Disney", "Dance", "Corgi"];

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();

    var topic = $("#gif-input").val().trim();
    topics.push(topic);

    renderButtons();
});

renderButtons();


$("#buttons-view").on("click", "button", function () {
    document.getElementById("gifs-view").innerHTML = "";
    var topicButton = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicButton + "&api_key=u3dO4sRQ09yQ8ZsF3dPRXKX0Irdipq4R&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var topicImage = $("<img>").addClass("imageAnimate");
            var imageURL = results[i].images.fixed_height.url;
            var stillImageURL = imageURL.slice(0, -4) + "_s" + imageURL.slice(-4);
            topicImage.attr("data-animate", imageURL);
            topicImage.attr("data-still", stillImageURL);
            topicImage.attr("data-state", "still");
            topicImage.attr("src", stillImageURL);

            gifDiv.append(p);
            gifDiv.append(topicImage);
            $("#gifs-view").append(gifDiv);
        }
    })
    
});

$("#gifs-view").on("click",".imageAnimate", function(){
    var topicImage = $(this);
    
    var state = topicImage.attr("data-state");

      if (state === "still") {
        topicImage.attr("src", topicImage.attr("data-animate"));
        topicImage.attr("data-state", "animate");
      } else {
        topicImage.attr("src", topicImage.attr("data-still"));
        topicImage.attr("data-state", "still");
      }
});