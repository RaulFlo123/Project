console.log("js console");
var grid = document.getElementById("grid-container");

var xhttp = new XMLHttpRequest();
const playlist = document.getElementById("playlist");
const searchInput = document.getElementById("search");

var tracks = [];

xhttp.open("GET", "musicdata.json", true);
xhttp.send();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(xhttp.responseText);
    tracks = data.tracks;

    console.log(tracks[0].title);
    displayTracks(tracks);
  }
};
xhttp.open("GET", "playlist.json", true);
xhttp.send();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(xhttp.responseText);
    tracks = data.tracks;

    console.log(tracks[0].title);
    displayTracks(tracks);
  }
    console.log(data);
    displayData(data);
  
  data.forEach (function(song) {
    let card = document.createElement("div");
    card.classList.add("card");
    let title = document.createElement("h3");
    title.textContent = song.title;
    card.appendChild(title);
    grid.appendChild(card);
    
    let textData =
  "<div class='song-title'>" + song.title + "</div>" +
  "<span>" +
    "Artist: " + song.artist + "<br>" +
    "Release date: " + song.releasedate + "<br>" +
    "Needs Research: " + "<br>" +
    "Duration: " + song.duration + "<br>" +
    "Artwork: " + song.artwork +
  "</span>";


    card.innerHTML = textData;

    if(song.image_url){
        card.style.backgroundImage = "url('" + song.image_url + "')";
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
    }
    grid.appendChild(card);
  });

function displayTracks(tracks) {
  playlist.innerHTML = "";

  tracks.forEach(function(track) {
    let trackItem = document.createElement("div");
    trackItem.classList.add("track-item");

    let trackInfo = document.createElement("div");
    trackInfo.classList.add("track-info");

    let title = document.createElement("h3");
    title.textContent = track.title;
    trackInfo.appendChild(title);

    let artist = document.createElement("p");
    artist.textContent = "Artist: " + track.artist;
    trackInfo.appendChild(artist);

    let releaseDate = document.createElement("p");
    releaseDate.textContent = "Release Date: " + track.releasedate;
    trackInfo.appendChild(releaseDate);

    let duration = document.createElement("p");
    duration.textContent = "Duration: " + track.duration;
    trackInfo.appendChild(duration);

    trackItem.appendChild(trackInfo);
    playlist.appendChild(trackItem);
  });
}

searchInput.addEventListener("input", function() {
  let query = searchInput.value.toLowerCase();
  let filteredTracks = tracks.filter(function(track) {
    return track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query);
  });
  displayTracks(filteredTracks);
});
};

