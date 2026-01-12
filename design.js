console.log("js console");
let data;
let grid = document.querySelector(".grid-container");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(xhttp.responseText);
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
    "Publisher:" + song.publisher + "<br>" +
    "release date:" + song.release_date + "<br>" + 
    "Needs Research:" + "<span>"
    "Duration:" + song.duration +
    "</span>";

    card.innerHTML = textData;

    if(song.image_url){
        card.style.backgroundImage = "url('" + song.image_url + "')";
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
    }
    grid.appendChild(card);
  });
  }
};