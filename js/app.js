//variables
const song = document.querySelector('.song');
const play = document.querySelector('.play');
const video = document.querySelector('.vid-container video');
const outline = document.querySelector('.moving-outline circle');
const timeDisplay = document.querySelector('.time-display');
const sounds = document.querySelectorAll('.sound-picker button');
const timeSelect = document.querySelectorAll('.time-select button');

let duration = 600;

const outlineLength = outline.getTotalLength();
timeDisplay.textContent = `${Math.floor(duration / 60)}:0${Math.floor(duration % 60)}`;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

play.addEventListener('click', () => {
  checkPlaying(song);
});

timeSelect.forEach(button => {
  button.addEventListener('click', function(){
    duration = this.getAttribute('data-time');
    timeDisplay.textContent = `${duration / 60}:0${duration % 60}`;
  });
});

sounds.forEach(option => {
  option.addEventListener('click', function(){
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  });
});

song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = duration - currentTime;
  let minutes = Math.floor(elapsed / 60);
  let seconds = Math.floor(elapsed % 60);
  let progress = outlineLength - (currentTime / duration ) * outlineLength;
  outline.style.strokeDashoffset = progress;
  if(seconds < 10){
    timeDisplay.textContent = `${minutes}:0${seconds}`;
  } else {
    timeDisplay.textContent = `${minutes}:${seconds}`;
  }
  if(currentTime >= duration){
    song.pause();
    song.currentTime = 0;
    video.pause();
    play.src = './svg/pause.svg';
  }
}


const checkPlaying = (song) => {
  if(song.paused){
    song.play();
    video.play();
    play.src = './svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = './svg/play.svg';
  }

}
