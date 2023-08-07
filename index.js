const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    // {
    //     path: 'assets/1.mp3',
    //     displayName: 'The Charmer\'s Call',
    //     cover: 'assets/1.jpg',
    //     artist: 'Hanu Dixit',
    // },
    // {
    //     path: 'assets/2.mp3',
    //     displayName: 'You Will Never See Me Coming',
    //     cover: 'assets/2.jpg',
    //     artist: 'NEFFEX',
    // },
    // {
    //     path: 'assets/3.mp3',
    //     displayName: 'Intellect',
    //     cover: 'assets/3.jpg',
    //     artist: 'Yung Logos',
    // },
    {
        path:'songs/1.mp3',
        displayName:'unholy',
        cover:'songs/1.jpg',
        artist:'Sam Smith',
    },
    {
        path:'assets/Downers At Dusk.mp3',
        displayName:'Downers At Dusk',
        cover:'assets/4.jpg',
        artist:'Talha Anjum',
    },
    
    {
        path:'songs/2.mp3',
        displayName:'Spinnin',
        cover:'songs/2.jpg',
        artist:'Connor Price and Bens',
    },
    {
        path:'songs/3.mp3',
        displayName:'Fuck my life',
        cover:'songs/3.jpg',
        artist:'Seventeen',
    },
    {
        path:'songs/4.mp3',
        displayName:'Daechwita',
        cover:'songs/4.jpg',
        artist:'Suga(agustd)',
    },
    {
        path:'songs/5.mp3',
        displayName:'Wave',
        cover:'songs/5.jpg',
        artist:'Ateez',
    },
    {
        path:'songs/6.mp3',
        displayName:'So what',
        cover:'songs/6.jpg',
        artist:'BTS',
    },
    {
        path:'songs/7.mp3',
        displayName:'Love Somebody',
        cover:'songs/7.jpg',
        artist:'Lauv',
    },
    {
        path:'songs/8.mp3',
        displayName:'Violet',
        cover:'songs/8.jpg',
        artist:'Connor Price',
    },
    {
        path:'songs/9.mp3',
        displayName:'Gorgeous',
        cover:'songs/9.jpg',
        artist:'Taylor Swift',
    },
    {
        path:'songs/10.mp3',
        displayName:'Ghost',
        cover:'songs/10.jpg',
        artist:'Justin Bieber',
    }

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);