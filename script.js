let songlist = document.querySelector(".songs");
let tracker = document.querySelector(".tracker");
let closebtn = document.querySelector("#close");
let menu = document.querySelector("#menu");
let menubar = document.querySelector(".leftside");
let audio = new Audio();
let songsname = document.querySelector("#currentsongname")
let songsartist = document.querySelector("#currentsongartist")
startbtn = document.querySelector("#start");
satrtpauseimg = document.querySelector("#start img");
prevbtn = document.querySelector("#previous");
nextbtn = document.querySelector("#next");
vol = document.querySelector("label");
volimg = document.querySelector(".volume img");
let playing = false;
let number = 0;
let seek = 0;
let songs = [
    {
        artist: "Artemas",
        songName: "i like the way you kiss me",
        path: "songs/Artemas - i like the way you kiss me (official music video).mp3"
    },
    {
        artist: "Edward Maya & Vika Jigulina",
        songName: "Stereo Love",
        path: "songs/Edward Maya & Vika Jigulina - Stereo Love (Official Music Video).mp3"
    },
    {
        artist: "Gracie Abrams",
        songName: "Close To You",
        path: "songs/Gracie Abrams - Close To You (Official Visual).mp3"
    },
    {
        artist: "Lana Del Rey",
        songName: "Diet Mountain Dew Demo",
        path: "songs/lana del rey - diet mountain dew demo lyrics.mp3"
    },
    {
        artist: "Manu Chao",
        songName: "Me Gustas Tu",
        path: "songs/Manu Chao - Me Gustas Tu (Official Audio).mp3"
    }
];

function playsong(number) {
    playing = true;
    let song = songs[number].path;
    songsname.textContent = songs[number].songName;
    songsartist.textContent = `By ${songs[number].artist}`
    audio.src = song;
    audio.play();
    setInterval(() => {
        seek = (audio.currentTime / audio.duration) * 100;
        tracker.style.left = `${seek}%`;
    }, 200);

}

function cardscreate() {
    for (let i = 0; i < songs.length; i++) {
        songlist.innerHTML += `
        <div class="card" data-index="${i}">
            <img src="assests/playlist-2-svgrepo-com.svg" alt="">
            <div class="songdetails">
                <p id="songname">${songs[i].songName}</p>
                <p id="artistname">${songs[i].artist}</p>
            </div>
        </div>`;
    }
}

cardscreate();

function cardclick(event) {
    number = event.currentTarget.getAttribute('data-index');
    playsong(number);
    satrtpauseimg.src = `assests/pause-svgrepo-com.svg`
}

let cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("click", cardclick);
});

function audiocontrol() {
    let volumes = volumeslider.value;
    audio.volume = volumes / 100;
    vol.textContent = Math.round(audio.volume * 100);
    if (vol.textContent == "0") {
        volimg.src = 'assests/volume-4-svgrepo-com.svg'
    }
    else {
        volimg.src = `assests/volume.svg`
    }

}
let volumeslider = document.querySelector("#vol");
volumeslider.addEventListener("click", audiocontrol);

prevbtn.onclick = function () {
    satrtpauseimg.src = `assests/pause-svgrepo-com.svg`
    console.log(number);
    if (number > 0) {
        number--;
        playsong(number)
    }
    else {
        playsong(number)
    }

}
nextbtn.onclick = function () {
    satrtpauseimg.src = `assests/pause-svgrepo-com.svg`
    console.log(number);
    if (number < songs.length - 1) {
        number++;
        playsong(number)
    }
    else {
        playsong(number)
    }

}
startbtn.onclick = function () {
    if (playing) {
        audio.pause();
        playing = false;
        satrtpauseimg.src = `assests/play-svgrepo-com.svg`
    }
    else {
        audio.play();
        playing = true;
        satrtpauseimg.src = `assests/pause-svgrepo-com.svg`
    }

}
menu.addEventListener("click", () => {
    menubar.style.transform = "translatex(0)"
})
closebtn.addEventListener("click", () => {
    menubar.style.transform = "translatex(-600px)"
})
