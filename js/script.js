"use strict";

const API_KEY = "29bb47b7552ec502eb87cebfbc77f766";
const API_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";
//events
$(document).ready(function () {
  $(".search__btn").click(() => {
    getMovie();
  });

  $(".search__field").keypress((e) => {
    if (e.keyCode === 13) getMovie();
  });

  function getMovie() {
    let query = $(".search__field").val();

    $("body").addClass("loading");

    if (query !== "") {
      $(".movie").remove();

      $.ajax({
        url: `${API_URL}/search/movie`,
        type: "GET",
        dataType: "json",
        data: {
          api_key: API_KEY,
          query: query,
        },
      }).then((res) => {
        if (res.results.length === 0) {
          alert("sasay loh");
        } else {
          res.results.forEach((movie) => {
            if (movie.poster_path) $("body").append(drawMovie(movie));
          });
        }
        $("body").removeClass("loading");
      });
    }
  }

  function drawMovie(movie) {
    let movieDOM = `<div class="movie">
        <img src="${IMG_URL + movie.poster_path}" alt="">
        <h2 class="movie__title">${movie.title}</h2>
        <div class="movie__info">
            <h3><b>Release date:${movie.release_date}</b></h3>
            <h3><b>Rating:${movie.vote_average}</b></h3>
            <p>${movie.overview}</p>
        </div>
    </div>`;
    return movieDOM;
  }

  function getReviews(id) {
    $.ajax({
      url: `${API_URL}/movies/${id}`,
      type: "GET",
      dataType: "json",
      data: {
        api_key: API_KEY,
      },
    });
  }
});
