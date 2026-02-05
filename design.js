console.log("js started");

var data;
var grid = document.querySelector(".grid-container");

// LOAD DATA (localStorage first, otherwise XHR)
if (localStorage.getItem("datalist")) {
  data = JSON.parse(localStorage.getItem("datalist"));
  console.log("Loaded from localStorage");
  if (grid) {
    makeCards();
  }
} else {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      console.log("Loaded from gameData.json");

      localStorage.setItem("datalist", JSON.stringify(data));
      console.log("Saved starter data to localStorage");

      if (grid) {
        makeCards();
      }
    }
  };

  xhttp.open("GET", "data.json", true);
  xhttp.send();
}
// RENDER CARDS
function makeCards() {
  grid.innerHTML = "";

  data.forEach(function (song) {
    let card = document.createElement("div");
    card.classList.add("card");

    let textData =
      "<div class='song-title'>" + song.title + "</div>" +
      "<div>Artist: " + song.artist + "</div>" +
      "<div>Release Date: " + song.releasedate + "</div>";

    card.innerHTML = textData;
    grid.appendChild(card);
  });

  console.log("cards refreshed");
}



var form = document.querySelector("form");
var titleInput = document.querySelector("#title-input");
var pubInput = document.querySelector("#artist-input");
var dateInput = document.querySelector("#releasedate-input");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var newObj = {
    title: titleInput.value,
    artist: pubInput.value,
    releasedate: dateInput.value
  };

  data.push(newObj);
  localStorage.setItem("datalist", JSON.stringify(data));
  console.log("Saved new item to localStorage");

  // Only render if grid exists on this page
  if (document.querySelector(".grid-container")) {
    makeCards();
  }

  form.reset();
});


















/*console.log("js console"); // [__D__] - 1
var form = document.querySelector("form");
var titleInput = document.querySelector("#title-input");
var pubInput = document.querySelector("#artist-input");
var dateInput = document.querySelector("#releasedate-input");
let data; // [__N__] - 2
let grid = document.querySelector(".grid-container"); // [__H__] - 3

var xhttp = new XMLHttpRequest(); // [__E__] - 4

xhttp.onreadystatechange = function () { // [__O__] - 5
  if (this.readyState == 4 && this.status == 200) { // [__J__] - 6

    data = JSON.parse(xhttp.responseText); // [__F__] - 7
    console.log(data); // [__C__] - 8

    data.forEach(function (song) { // [__A__] - 9
      let card = document.createElement("div"); // [__P__] - 10
      card.classList.add("card"); // [__G__] - 11

      let textData =
        "<div class='song-title'>" + song.title + "</div>" +
        "<span>" +
        "Artist: " + song.artist + "<br>" +
        "Release Date: " + song.releasedate + "<br>" +
        "Duration: " + song.duration +
        "</span>" +
        "<img src='" + song.artwork + "' alt='" + song.title + " artwork'>";


      card.innerHTML = textData; // [__L__] - 13
      grid.appendChild(card);
    });
    data = [];

    if (localStorage.getItem("playlist")) {
      data = JSON.parse(localStorage.getItem("playlist"));
    } else {
      data = jsonDataFromFile;
      localStorage.setItem("playlist", JSON.stringify(data));
    }

    renderSongs();

  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let title = titleInput.value;
  let publisher = devInput.value;
  let releaseDate = releaseateInput.value;
  let gifSrc = gifInput.value;
  let imgSrc = imgInput.value;
  let newObj = {
    "id": getNextId(),
    "title": title,
    "artist": artist,
    "releasedate": releasedate,
    "imgSrc": imgSrc,
    "gifSrc": gifSrc
  };
  submitData(newObj);
  form.reset();
});
if (localStorage.getItem("datalist")) {
  data = JSON.parse(localStorage.getItem("datalist"));
} else {
  data = [];
}




form.addEventListener("submit", function (e) {
  e.preventDefault();

  var newObj = {
    title: titleInput.value,
    publisher: pubInput.value,
    releaseDate: dateInput.value
  };

  data.push(newObj);
  localStorage.setItem("datalist", JSON.stringify(data));
  console.log("Saved new item to localStorage");


  if (document.querySelector(".grid-container")) {
    makeCards();
  }

  form.reset();
});





search.addEventListener("input", function () {
  let query = search.value.toLowerCase();

  let filtered = data.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query)
  );

  renderFiltered(filtered);
});

*/