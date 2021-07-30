var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            if (typeOfSearch === "all with title") {
              console.log(httpRequest.responseText);
              var allMovies = JSON.parse(httpRequest.responseText);
            
              for (var i = 0; i < allMovies.Search.length; i++) {
              var movies = {};
              movies["Poster"] = allMovies.Search[i].Poster;
              movies["Title"] = allMovies.Search[i].Title;
              movies["Year"] = allMovies.Search[i].Year;
              movies["imdbID"] = allMovies.Search[i].imdbID;
              if (i === 0 || i === 4 || i === 8 || i === 11) {
                $('.movies').append('<div class="row justify-content-around text-center movieSection"></div>');
            }
              $('.movieSection:last').append('<div class="col-2 bg-light border rounded border-secondary my-3"><img class="img-fluid poster"' +
              ' src= "' + movies.Poster + '"/>' +
              '<p class="title"> <a target="_blank" href= "https://www.imdb.com/title/' + movies.imdbID + '">Title: ' +  movies.Title + '</a></p>' +
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

              $('body').append('<img' +
              ' src= "' + movies.Poster + '"/>' +
              '<p> <a href= "https://www.imdb.com/title/' + movies.imdbID + '">Title: ' +  movies.Title + '</a></p>' +
              '<p>Year: ' + movies.Year + '</p>');
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
    httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + input + '&plot=short&apikey=b7da8d63');
    httpRequest.send(null);
  }
}

var searchMovieTitle = function () {
  typeOfSearch = "specific";
  var input = document.querySelector('input').value;
  if (input) {
    httpRequest.open('GET', 'https://www.omdbapi.com/?t=' + input + '&plot=short&apikey=b7da8d63');
    httpRequest.send(null);
  }
}