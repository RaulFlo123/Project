console.log("js console");

const grid = document.getElementById("grid-container");
const playlist = document.getElementById("playlist");
const searchInput = document.getElementById("search");

let tracks = [];

fetch("musicdata.json")
  .then(res => res.json())
  .then(data => {
    tracks = data.tracks;
    displayTracks(tracks);
  })
  .catch(err => console.error(err));

fetch("playlist.json")
  .then(res => res.json())
  .then(data => {
    displayCards(data);
  })
  .catch(err => console.error(err));

function displayCards(data) {
  grid.innerHTML = "";

  data.forEach(song => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="song-title">${song.title}</div>
      <span>
        Artist: ${song.artist}<br>
        Release date: ${song.releasedate}<br>
        Duration: ${song.duration}
      </span>
    `;

    if (song.image_url) {
      card.style.backgroundImage = `url('${song.image_url}')`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";
    }

    grid.appendChild(card);
  });
}

function displayTracks(tracks) {
  playlist.innerHTML = "";

  tracks.forEach(track => {
    const trackItem = document.createElement("div");
    trackItem.classList.add("track-item");

    trackItem.innerHTML = `
      <h3>${track.title}</h3>
      <p>Artist: ${track.artist}</p>
      <p>Release Date: ${track.releasedate}</p>
      <p>Duration: ${track.duration}</p>
    `;

    playlist.appendChild(trackItem);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = tracks.filter(track =>
    track.title.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query)
  );
  displayTracks(filtered);
});
