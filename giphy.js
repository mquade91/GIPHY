//Initial array is of Netflix TV Shows
var netflix = ["Breaking Bad", "Walking Dead", "Peaky Blinders", "Breaking Bad", "Dexter", "Stranger Things"];

// Function for displaying movie data
function renderButtons() {

    // // Deleting the movie buttons prior to adding new movie buttons
    // // (this is necessary otherwise we will have repeat buttons)
    $("#shows-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < netflix.length; i++) {

        // Then dynamicaly generating buttons for each show in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("show");
        // Adding a data-attribute with a value of the show at index i
        a.attr("data-name", netflix[i]);
        // Providing the button's text with a value of the show at index i
        a.text(netflix[i]);
        // Adding the button to the HTML
        $("#shows-view").append(a);
    }
}
// // Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

// This function handles events where one button is clicked
$("#add-show").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var show = $("#show-input").val().trim();

    // The show from the textbox is then added to our array
    netflix.push(show);
    console.log(show);
    renderButtons();


});


$(document).on('click', '.show', function(event) {


    // // calling renderButtons which handles the processing of our movie array
    renderButtons();


    //In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-name");
    console.log(person);

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results);

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                //     // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    //         // Creating an image tag
                    var personImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    personImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    // Prepending the gifDiv to the "#shows-view" div in the HTML
                    $("#shows-view").append(gifDiv);

                }
            }
        });

    //}

});









//  // Constructing a URL to search Giphy for the name of the person who said the quote
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         netflix + "&api_key=dc6zaTOxFJmzC&limit=10";

//     // Performing our AJAX GET request
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//     // // After the data comes back from the API
//     // .done(function(response)
