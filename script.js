// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let volumeControl = document.getElementById('volumeControl');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');
let shuffleBtn = document.getElementById('shuffle');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let isShuffle = false;

// Define your songs here
let songs = [
    { songName: "On & On", filePath: "songs/1.mp3", coverPath: "images/1.jpg" },
    { songName: "Invincible", filePath: "songs/2.mp3", coverPath: "images/2.jpg" },
    { songName: "Mortals", filePath: "songs/3.mp3", coverPath: "images/3.jpg" },
    { songName: "Shine", filePath: "songs/4.mp3", coverPath: "images/4.jpg" },
    { songName: "Why We Lose", filePath: "songs/5.mp3", coverPath: "images/5.jpg" },
    { songName: "Sky High", filePath: "songs/6.mp3", coverPath: "images/6.jpg" },
    { songName: "Symbolism", filePath: "songs/7.mp3", coverPath: "images/7.jpg" },
    { songName: "Heroes Tonight", filePath: "songs/8.mp3", coverPath: "images/8.jpg" },
    { songName: "Feel Good", filePath: "songs/9.mp3", coverPath: "images/9.jpg" },
    { songName: "My Heart", filePath: "songs/10.mp3", coverPath: "images/10.jpg" }
];

// Function to play a specific song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    updateSongListIcons();  // Update the song icons (play/pause) in the list
};

// Function to pause the song
const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
};

// Function to play the next song
const playNextSong = () => {
    if (isShuffle) {
        shuffleSongs();
    } else {
        songIndex = (songIndex + 1) % songs.length;  // Loop back to first song if at the end
    }
    playSong();
};

// Function to play the previous song
const playPrevSong = () => {
    if (songIndex === 0) {
        songIndex = songs.length - 1;  // Go to last song if at the first song
    } else {
        songIndex--;
    }
    playSong();
};

// Function to shuffle songs
const shuffleSongs = () => {
    let randomIndex = Math.floor(Math.random() * songs.length);
    while (randomIndex === songIndex) {
        randomIndex = Math.floor(Math.random() * songs.length);  // Ensure the new song is different
    }
    songIndex = randomIndex;
    playSong();
};

// Function to update play/pause icons in song list
const updateSongListIcons = () => {
    makeAllPlays();  // Reset all icons to play
    let currentPlayIcon = document.getElementById(`songItemPlay-${songIndex}`);
    currentPlayIcon.classList.remove('fa-play-circle');
    currentPlayIcon.classList.add('fa-pause-circle');
};

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Function to initialize song items
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName('img')[0].src = songs[i].coverPath;
        element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
        element.getElementsByClassName('songItemPlay')[0].id = `songItemPlay-${i}`;
        element.getElementsByClassName('songItemPlay')[0].addEventListener('click', () => {
            songIndex = i;
            playSong();
        });
    });
};

// Handle play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

// Listen to the 'ended' event for automatically playing the next song
audioElement.addEventListener('ended', playNextSong);

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Update song time when progress bar is clicked
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});

// Next and previous song button functionality
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);

// Shuffle button functionality
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');  // Toggle visual indicator of shuffle mode
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        masterPlay.click();  // Play/pause using spacebar
    } else if (e.code === 'ArrowRight') {
        playNextSong();  // Skip to next song using right arrow
    } else if (e.code === 'ArrowLeft') {
        playPrevSong();  // Go to previous song using left arrow
    }
});

// Initialize song items when page loads
initializeSongItems();
