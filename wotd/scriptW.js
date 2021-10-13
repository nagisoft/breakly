"use strict"



/*******************************************************************
* Get Wotd + definition
********************************************************************/
function theWord(callback) {
    var baseUrl = "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=";
    var apiKey = "1380d58b8b5c33325130c0e8f340be6bc6fba6f7bb65bfc6f";
    var apiUrl = baseUrl + apiKey;
    return new Promise(function(resolve, reject) {
        
      $.ajax({
          type: "GET",
          url: apiUrl,
          dataType: "json",
          success: function(data) {
              $("#word").append(data.word);
              $("#defin").append(data.definitions[0].text);
              resolve();
          }
      });

    });
}


/****************************
* Show img + word + definition
*****************************/
$(document).ready(function() {
    theWord();
    $('img').css('opacity', 1);
    $('body').css('opacity', 1);
});

$('#favorites').click(function() {
    $('#fave-panel').addClass('hide');
})
