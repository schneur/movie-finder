var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            $( ".movieSection" ).remove();
            if (typeOfSearch === "all with title") {
              console.log(httpRequest.responseText);
              var allMovies = JSON.parse(httpRequest.responseText);
            
              for (var i = 0; i < allMovies.Search.length; i++) {
              var movies = {};
              movies["Poster"] = allMovies.Search[i].Poster;
              movies["Title"] = allMovies.Search[i].Title;
              movies["Year"] = allMovies.Search[i].Year;
              movies["imdbID"] = allMovies.Search[i].imdbID;
              if (i % 4 == 0) {
                $('.movies').append('<div class="row justify-content-around text-center movieSection"></div>');
            }
              $('.movieSection:last').append('<div class="col-2 bg-light border rounded border-secondary searchResults my-3"><img class="img-fluid poster"' +
              ' src= "' + movies.Poster + '"/>' +
              '<p class="title pl-1"> <a target="_blank" href= "https://www.imdb.com/title/' + movies.imdbID + '">Title: ' +  movies.Title + '</a></p>' +
              '<p>Year: ' + movies.Year + '</p></div>');
            }
            } else {
              console.log(httpRequest.responseText);
              var movie = JSON.parse(httpRequest.responseText);
              var movies = {};
              movies["Poster"] = movie.Poster;
              movies["Title"] = movie.Title;
              movies["Year"] = movie.Year;
              movies["imdbID"] = movie.imdbID;
              movies["Plot"] = movie.Plot;
              
              $('.movies').append('<div class="row justify-content-around text-center movieSection"><div class="col-4 bg-light border rounded border-secondary my-3"><img class="img-fluid poster"' +
              ' src= "' + movies.Poster + '"/>' +
              '<p class="title"> <a target="_blank" href= "https://www.imdb.com/title/' + movies.imdbID + '">Title: ' +  movies.Title + '</a></p>' + '<p> ' + movies.Plot + '</p>' +
              '<p>Year: ' + movies.Year + '</p></div></div>')
            }
            }
            
        } else {
         console.log(httpRequest.statusText);
       }
    }
   
    httpRequest.onerror = function() {
    console.log(httpRequest.statusText);
   }

var typeOfSearch = "specific";

var searchMovies = function () {
  typeOfSearch = "all with title";
  var input = document.querySelector('input').value;
  if (input) {
    httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + input + '&apikey=b7da8d63');
    httpRequest.send(null);
    $('input').val('');
  }
}

var searchMovieTitle = function () {
  typeOfSearch = "specific";
  var input = document.querySelector('input').value;
  if (input) {
    httpRequest.open('GET', 'https://www.omdbapi.com/?t=' + input + '&plot=full&apikey=b7da8d63');
    httpRequest.send(null);
    $('input').val('');
  }
}

