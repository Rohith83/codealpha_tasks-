import { songs } from "./backend/songs.js";

const audio = document.querySelector(".js-audio");
const cover = document.querySelector(".js-cover");
const title = document.querySelector(".js-title");
const artist = document.querySelector(".js-artist");

const playBtn = document.querySelector(".js-play");
const prevBtn = document.querySelector(".js-prev");
const nextBtn = document.querySelector(".js-next");
const repeatBtn = document.querySelector(".js-repeat");

const progress = document.querySelector(".js-progress");
const volume = document.querySelector(".js-volume");

const playlist = document.querySelector(".js-playlist");

const currentTimeEl = document.querySelector(".js-current-time");
const durationEl = document.querySelector(".js-duration");

const lyricsEl = document.querySelector(".js-lyrics");

const shuffleBtn = document.querySelector(".js-shuffle");



const queueToggle =
document.querySelector(".js-queue-toggle");

const queueBox =
document.querySelector(".js-queue-box");


let currentSongIndex = 0;
let isPlaying = false;
let isRepeat = false;

function loadSong(index) {
  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  lyricsEl.textContent = song.lyrics;

  renderPlaylist();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", () => {
  if (isShuffle) {
    let randomIndex = Math.floor(Math.random() * songs.length);

    while (randomIndex === currentSongIndex && songs.length > 1) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }

    currentSongIndex = randomIndex;
  } else {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
  }

  loadSong(currentSongIndex);
  playSong();
  renderPlaylist();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  loadSong(currentSongIndex);
  playSong();
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;

  repeatBtn.classList.toggle("active");
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    playSong();
  } else {
    nextBtn.click();
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

loadSong(currentSongIndex);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  }
});

progress.addEventListener("input", () => {
  const duration = audio.duration;

  if (duration) {
    audio.currentTime = (progress.value / 100) * duration;
  }
});


queueToggle.addEventListener("click", () => {
  queueBox.classList.toggle("show");
});

let isShuffle = false;

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active");
});

function renderPlaylist() {
  let playlistHTML = "";

  songs.forEach((song, index) => {
  playlistHTML += `
    <li
      class="playlist-item ${
        index === currentSongIndex ? "active-song" : ""
      }"
      data-index="${index}"
    >
      <span>${song.title}</span>
      <small>${song.artist}</small>
    </li>
  `;
});

  playlist.innerHTML = playlistHTML;

  document.querySelectorAll(".playlist-item").forEach((item) => {
    item.addEventListener("click", () => {
      currentSongIndex = Number(item.dataset.index);
      loadSong(currentSongIndex);
      playSong();
      renderPlaylist();
    });
  });
}

renderPlaylist();