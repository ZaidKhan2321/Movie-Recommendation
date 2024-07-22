const selectGenre = document.getElementById('genres') ;
const apiKey = 'f6c29cb4f06afd9cbe661c10a45373df' ;

const genreRequest = new XMLHttpRequest() ;
genreRequest.open('GET', `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`) ;
genreRequest.send() ;
genreRequest.addEventListener('load', ()=>{
    const genreList = genreRequest.responseText ;
    const genresObj = JSON.parse(genreList) ;
    console.log(genresObj) ;
    genresObj.genres.forEach((data)=>{
        const genreData = document.createElement('option') ;
        genreData.textContent = data.name ;
        genreData.value = data.name ;
        genreData.dataset.id = data.id ;
        selectGenre.appendChild(genreData) ;
    }) ;  
    movieDisplay(genresObj.genres[0].id) ;
}) ;
const movieInfoEl = document.getElementById('movieInfo') ;
const moviePosterEl = document.getElementById('moviePoster') ;
const movieTextEl = document.getElementById('movieText') ;
const movieTitleEl = document.createElement('div') ;
const movieOverviewEl = document.createElement('div') ;
movieTitleEl.id = "movieTitle" ;
movieOverviewEl.id = "movieOverview" ;
movieTextEl.appendChild(movieTitleEl) ;
movieTextEl.appendChild(movieOverviewEl) ;
const searchBtn = document.getElementById('playBtn') ;
const nextBtn = document.getElementById('likeBtn') ;
const nextBtnPar = document.getElementById('likeOrDislikeBtns') ;
selectGenre.addEventListener('change', function(){
    const genre = selectGenre.options[selectGenre.selectedIndex] ;
    movieDisplay(genre.dataset.id) ;
}) ;

function movieDisplay(id){
    const genreMovieRequest = new XMLHttpRequest() ;
    genreMovieRequest.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`) ;
    genreMovieRequest.send() ;
    genreMovieRequest.addEventListener('load', ()=>{
        const genreMovieList = genreMovieRequest.responseText ;
        const genreMovieObj = JSON.parse(genreMovieList) ;
        console.log(genreMovieObj) ;
        let index = Math.floor(Math.random()*genreMovieObj.results.length) ;
        const movieId = genreMovieObj.results[index].id ;
        searchBtn.addEventListener('click', function(){
            searchDisplay(genreMovieObj, index) ;
        }) ;
        nextBtn.addEventListener('click', function(){
            index = Math.floor(Math.random()*genreMovieObj.results.length) ;
            searchDisplay(genreMovieObj, index) ;
        }) ;
    }) ;
}

function searchDisplay(genreMovieObj, index){
    const imageEl = document.getElementById('imgtag') ;
    imageEl.src = `https://image.tmdb.org/t/p/w500/${genreMovieObj.results[index].poster_path}` ;
    movieTitleEl.textContent = genreMovieObj.results[index].title ;
    movieOverviewEl.textContent = genreMovieObj.results[index].overview ;
    nextBtnPar.style.display = "block" ;
}