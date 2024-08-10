// DOM Elements
let songListContainer = document.querySelector(".songs");
let progressTracker = document.querySelector(".tracker");
let closeButton = document.querySelector("#close");
let menuButton = document.querySelector("#menu");
let sidebar = document.querySelector(".leftside");
let audioPlayer = new Audio();
let currentSongName = document.querySelector("#currentsongname");
let currentSongArtist = document.querySelector("#currentsongartist");
let playPauseButton = document.querySelector("#start");
let playPauseIcon = document.querySelector("#start img");
let previousButton = document.querySelector("#previous");
let nextButton = document.querySelector("#next");
let volumeLabel = document.querySelector("label");
let volumeIcon = document.querySelector(".volume img");
let volumeSlider = document.querySelector("#vol");
let playlistContainer = document.querySelector(".playlist");
let statusbar = document.querySelector(".status");

// State Variables
let isPlaying = false;
let currentSongIndex = 0;
let seekPercentage = 0;
let songList = [];
let playlists = [];
let updateIntervalId;

// Fetch and Set Playlists
async function loadPlaylists() {
    try {
        const response = await fetch("songs/songs.json");
        const data = await response.json();
        playlists = data.playlist;
    } catch (error) {
        console.error("Failed to fetch songs:", error);
    }
}

// Update Songs List Based on Playlist
function updateSongsList(playlistIndex) {
    songListContainer.innerHTML = '';
    songList.length = 0;
    for (let i = 0; i < playlists[playlistIndex].songs.length; i++) {
        songList.push(playlists[playlistIndex].songs[i]);
    }
}

// Play Selected Song
function playSong(songIndex) {
    isPlaying = true;
    let songPath = songList[songIndex].path;
    currentSongName.textContent = songList[songIndex].songName;
    currentSongArtist.textContent = `By ${songList[songIndex].artist}`;
    audioPlayer.src = songPath;
    audioPlayer.play();

    if (updateIntervalId) {
        clearInterval(updateIntervalId);
    }

    updateIntervalId = setInterval(() => {
        seekPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressTracker.style.left = `${seekPercentage}%`;
    }, 200);
}

// Create Song Cards
function createSongCards() {
    for (let i = 0; i < songList.length; i++) {
        songListContainer.innerHTML += `
        <div class="card" data-index="${i}">
            <img src="assets/playlist-2-svgrepo-com.svg" alt="">
            <div class="songdetails">
                <p id="songname">${songList[i].songName}</p>
                <p id="artistname">${songList[i].artist}</p>
            </div>
        </div>`;
    }
}

// Create Playlist Cards
function createPlaylistCards() {
    for (let i = 0; i < playlists.length; i++) {
        playlistContainer.innerHTML += `
            <div class="playlistcard" data-index="${i}">
                <div class="pimg"><img src="${playlists[i].image}" alt=""></div>
                <div class="ptitle">${playlists[i].playlistName}</div>
                <div class="pdescription">${playlists[i].description}</div>
            </div>`;
    }
}

// Update Audio Volume
function updateVolume() {
    let volumeValue = volumeSlider.value;
    audioPlayer.volume = volumeValue / 100;
    volumeLabel.textContent = Math.round(audioPlayer.volume * 100);
    volumeIcon.src = volumeLabel.textContent == "0" 
        ? 'assets/volume-4-svgrepo-com.svg' 
        : 'assets/volume.svg';
}

// Main Function
async function main() {
  // Create Song Cards
function createSongCards() {
    songListContainer.innerHTML = ''; // Clear existing song cards
    for (let i = 0; i < songList.length; i++) {
        songListContainer.innerHTML += `
        <div class="card" data-index="${i}">
            <img src="assets/playlist-2-svgrepo-com.svg" alt="">
            <div class="songdetails">
                <p id="songname">${songList[i].songName}</p>
                <p id="artistname">${songList[i].artist}</p>
            </div>
        </div>`;
    }

    // Add event listeners to newly created song cards
    let songCards = document.querySelectorAll(".card");
    songCards.forEach(card => {
        card.addEventListener("click", onSongCardClick);
    });
}

// Function to handle song card clicks
function onSongCardClick(event) {
    let index = Number(event.currentTarget.getAttribute('data-index'));
    if (index >= 0 && index < songList.length) {
        currentSongIndex = index;
        playSong(currentSongIndex);
        playPauseIcon.src = `assets/pause-svgrepo-com.svg`;
    } else {
        console.error('Invalid song index:', index);
    }
}

// Main Function
async function init() {
    await loadPlaylists();
    createPlaylistCards(); // Create playlist cards first
    volumeSlider.addEventListener("input", updateVolume);

    // Add event listeners to playlist cards
    let playlistCards = document.querySelectorAll(".playlistcard");
    playlistCards.forEach(card => {
        card.addEventListener("click", (event) => {
            let playlistIndex = Number(event.currentTarget.getAttribute('data-index'));
            if (playlistIndex >= 0 && playlistIndex < playlists.length) {
                updateSongsList(playlistIndex);
                createSongCards(); // Create song cards after updating song list
            } else {
                console.error('Invalid playlist index:', playlistIndex);
            }
        });
    });

    // Play Previous Song
    previousButton.onclick = function () {
        playPauseIcon.src = `assets/pause-svgrepo-com.svg`;
        if (currentSongIndex > 0) {
            currentSongIndex--;
        }
        playSong(currentSongIndex);
    }

    // Play Next Song
    nextButton.onclick = function () {
        playPauseIcon.src = `assets/pause-svgrepo-com.svg`;
        if (currentSongIndex < songList.length - 1) {
            currentSongIndex++;
        }
        playSong(currentSongIndex);
    }

    // Play/Pause Button
    playPauseButton.onclick = function () {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            playPauseIcon.src = `assets/play-svgrepo-com.svg`;
        } else {
            audioPlayer.play();
            isPlaying = true;
            playPauseIcon.src = `assets/pause-svgrepo-com.svg`;
        }
    }

    // Sidebar Menu
    menuButton.addEventListener("click", () => {
        sidebar.style.transform = "translateX(0)";
    });

    closeButton.addEventListener("click", () => {
        sidebar.style.transform = "translateX(-600px)";
    });
    statusbar.addEventListener("click" , (event)=>{
        let position= (event.offsetX/event.target.getBoundingClientRect().width)*100;
        progressTracker.style.left = `${position}%`;
        audioPlayer.currentTime=(position/100)*audioPlayer.duration
    })
}

// Initialize
init();

}

// Initialize
main();
