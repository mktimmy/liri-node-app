require("dotenv").config();
var axios = require ("axios");
var moment = require ("moment");

var SpotifyID = process.env.SPOTIFY_ID;
var moviesKey = process.env.MOVIES_API;
var SpotifySecret = process.env.SPOTIFY_SECRET;
var userInput = process.argv.slice(3).join(" ");
var liriCommand = process.argv[2];


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: SpotifyID,
  secret: SpotifySecret
});

switch(liriCommand){
    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "concert-this":
        concertThis();
        break; 

    default: 
        console.log("command not found. Try typing it correctly!")
}

function spotifyThis() {

    if (!userInput) {
        userInput = "Kiss from a Rose"
    }

    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        var artistName = data.tracks.items[0].album.artists[0].name; 
        var songURL = data.tracks.items[0].album.artists[0].external_urls.spotify; 
        var songName = data.tracks.items[0].name; 
        var albumName = data.tracks.items[0].album.name; 
        console.log(
        `
        Artist name: ${artistName}
        Song URL: ${songURL}
        Song name: ${songName}
        Album name: ${albumName}
        `
        )
    });
}

 //movies//

 function movieThis(){


    if (!userInput) {
        userInput = "Free Willy"
    }

    var movieURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=full&tomatoes=true&apikey=" + moviesKey;

    axios.get(movieURL)
    .then(function (response) {
    //console.log(response.data);
    var movieTitle = response.data.Title;
    var movieYear = response.data.Year;
    var imdbRating = response.data.imdbRating;
    var rottonTomatoes = response.data.tomatoRating;
    var country = response.data.Country;
    var language = response.data.Language;
    var plot = response.data.Plot;
    var actors = response.data.Actors;
    console.log(
    `
    Movie title: ${movieTitle}
    Movie year: ${movieYear}
    imdb Rating: ${imdbRating}
    Rotton Tomatoes Rating: ${rottonTomatoes}
    Country: ${country}
    language: ${language}
    Plot: ${plot}
    actors: ${actors}
    `
    )
    })

    .catch(function (error) {
    console.log(error);
    });
}
 
function concertThis(){
    var concertURL =  "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(concertURL)
    .then(function (response) {

        if(!response.data){
            console.log(`${userInput} isn't touring now. Pick someone else!`)
        }
        else{
            for(var i=0; i<response.data.length; i++){
                console.log(
                    `
                    Venue Name: ${response.data[i].venue.name}
                    Venue location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}
                    Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}
                    
                    ----------------------
                    `

                    )
            }
        }
        


        var movieTitle = response.data.Title;
    })
}

//do the do what it says
//use fs
