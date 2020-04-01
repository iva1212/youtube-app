const API_KEY = "AIzaSyDD-jDBP1V3kDiXAw9lJa99kwaL5F8yPgE";

var nextPageToken = "";
var prevPageToken = "";

var searchTerm ="";
function fetchVideos(){
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchTerm}&maxResults=10`;

    let settings = {
        method : 'GET'
    };
    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults( responseJSON );
        })
        .catch( err => {
            console.log( err );
        });
}

function fetchNewPage(token){
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchTerm}&maxResults=10&pageToken=${token}`;

    let settings = {
        method : 'GET'
    };
    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults( responseJSON );
        })
        .catch( err => {
            console.log( err );
        });
}

function displayResults( data ){
    let results = document.querySelector( '.results' );

    results.innerHTML = "";

    nextPageToken = data.nextPageToken;
    prevPageToken = data.prevPageToken;

    console.log(data);

    results.innerHTML= "";

    for( let i = 0; i < data.items.length; i ++ ){
        results.innerHTML += `
            <div>
               <h2 class="title">
                    <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}">${data.items[i].snippet.title}</a>
                </h2>
                
               <div class="thumbmail">
                    <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}"><img src="${data.items[i].snippet.thumbnails.medium.url}" /></a>
                </div>
            </div>
        `;
   }

}

function watchForm(){
    let submitButtton = document.querySelector( '.submitButtton' );

    submitButtton.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        searchTerm = document.querySelector( '#searchTerm' ).value;

        fetchVideos();

    });
}
function watchNavigation(){
    let nextButton = document.querySelector('.nextButton');
    let prevButton = document.querySelector('.prevButton');

    nextButton.addEventListener( 'click', ( event ) => {
         if(nextPageToken != ""){
            fetchNewPage(nextPageToken);
         }

    });
    prevButton.addEventListener( 'click', ( event ) => {
        if(prevPageToken != ""){
            fetchNewPage(prevPageToken);
        }
   });

}
function init(){
    watchForm();
    watchNavigation();
}

init();