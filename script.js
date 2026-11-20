// ================= ELEMENTS =================

const audio = document.getElementById("audioPlayer");
const video = document.getElementById("songVideo");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const mainTitle = document.getElementById("mainTitle");
const mainArtist = document.getElementById("mainArtist");

const playBtn = document.querySelector(".play img");
const progress = document.querySelector(".player-center input[type='range']");
const volume = document.querySelector(".player-right input[type='range']");

const nextBtn = document.querySelector(".controls img:nth-child(4)");
const prevBtn = document.querySelector(".controls img:nth-child(2)");
const shuffleBtn = document.querySelector(".controls img:nth-child(1)");
const repeatBtn = document.querySelector(".controls img:nth-child(5)");

const coverImage = document.querySelector(".player-left img");

const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
//home button
function goHome(){

document.getElementById("chartsPage").style.display="block";
document.getElementById("playlistPage").style.display="none";

}
//search button
function searchSongs() {
let filter = document.getElementById("searchBar").value.toLowerCase();

  const filteredSongs = currentPlaylist.filter(song => 
    song.title.toLowerCase().includes(filter)
  );

  const tbody = document.querySelector(".song-table tbody");
  tbody.innerHTML = "";

  filteredSongs.forEach((song, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index+1}</td>
      <td>${song.title}</td>
      <td>${song.artist}</td>
      <td>--</td>
    `;
   row.onclick = () => loadSong(index);
    tbody.appendChild(row);
  });
}

// ================= PLAYLISTS =================

const playlists = {

topHits: [

{audio:"songs/music/Top Hits/Jholful.mpeg", video:"songs/videos/Top Hits/Jhol video.mp4", title:"Jhol", artist:"Maanu and Annural Khalid", cover:"Jholpng.png"},
{audio:"songs/music/Top Hits/song2.mp3", video:"songs/videos/Top Hits/song2.mp4", title:"Top Hit 2", artist:"Artist B", cover:"card1.jpg"},
{audio:"songs/music/Top Hits/song3.mp3", video:"songs/videos/Top Hits/song3.mp4", title:"Top Hit 3", artist:"Artist C", cover:"card1.jpg"},
{audio:"songs/music/Top Hits/song4.mp3", video:"songs/videos/Top Hits/song4.mp4", title:"Top Hit 4", artist:"Artist D", cover:"card1.jpg"},
{audio:"songs/music/Top Hits/song5.mp3", video:"songs/videos/Top Hits/song5.mp4", title:"Top Hit 5", artist:"Artist E", cover:"card1.jpg"}

],

trending: [

{audio:"songs/music/Trending/song6.mp3", video:"songs/videos/Trending/song6.mp4", title:"Trending 1", artist:"Artist F", cover:"card2.jpg"},
{audio:"songs/music/Trending/song7.mp3", video:"songs/videos/Trending/song7.mp4", title:"Trending 2", artist:"Artist G", cover:"card2.jpg"},
{audio:"songs/music/Trending/song8.mp3", video:"songs/videos/Trending/song8.mp4", title:"Trending 3", artist:"Artist H", cover:"card2.jpg"},
{audio:"songs/music/Trending/song9.mp3", video:"songs/videos/Trending/song9.mp4", title:"Trending 4", artist:"Artist I", cover:"card2.jpg"},
{audio:"songs/music/Trending/song10.mp3", video:"songs/videos/Trending/song10.mp4", title:"Trending 5", artist:"Artist J", cover:"card2.jpg"}

],

topIndia: [

{audio:"songs/music/Top India/Saiyyara.mp3", video:"songs/videos/Top India/Saiyyara.mp4", title:"Saiyyara", artist:"Faheem Abdullah", cover:"songs/Covers/Top India/Saiyyara.jpg"},
{audio:"songs/music/Top India/song12.mp3", video:"songs/videos/Top India/song12.mp4", title:"India 2", artist:"Artist L", cover:"card3.jpg"},
{audio:"songs/music/Top India/song13.mp3", video:"songs/videos/Top India/song13.mp4", title:"India 3", artist:"Artist M", cover:"card3.jpg"},
{audio:"songs/music/Top India/song14.mp3", video:"songs/videos/Top India/song14.mp4", title:"India 4", artist:"Artist N", cover:"card3.jpg"},
{audio:"songs/music/Top India/song15.mp3", video:"songs/videos/Top India/song15.mp4", title:"India 5", artist:"Artist O", cover:"card3.jpg"}

],

global: [

{audio:"songs/music/Global/Dua Lipa - Houdini (Official Music Video)(MP3_160K).mp3", video:"songs/videos/Global/Dua Lipa - Houdini (Official Music Video)(720P_HD).mp4", title:"Houdini", artist:"Dua Lipa", cover:"songs/Covers/Global/Houdinicover.jpg"},
{audio:"songs/music/Global/Espresso(MP3_160K).mp3", video:"songs/videos/Global/Espresso(720P_HD).mp4", title:"Espresso", artist:"Selena Gomez", cover:"songs/Covers/Global/Espresso.jpg"},
{audio:"songs/music/Global/Benson Boone - Beautiful Things (Official Music Video)(MP3_160K).mp3", video:"songs/videos/Global/Benson Boone - Beautiful Things (Official Music Video)(720P_HD).mp4", title:"Beautiful Things", artist:"Benson Boone", cover:"songs/Covers/Global/Beutiful.jpg"},
{audio:"songs/music/Global/Teddy Swims - Lose Control (The Village Sessions)(MP3_160K).mp3", video:"songs/videos/Global/Teddy Swims - Lose Control (The Village Sessions)(720P_HD).mp4", title:"Lose Control", artist:"Teddy Swims", cover:"songs/Covers/Global/Lose.jpg"},
{audio:"songs/music/Global/Billie Eilish - BIRDS OF A FEATHER (Official Music Video)(MP3_160K).mp3", video:"songs/videos/Global/Billie Eilish - BIRDS OF A FEATHER (Official Music Video)(720P_HD).mp4", title:"BIRDS OF A FEATHER", artist:"Billie Eilish", cover:"songs/Covers/Global/Birds Of feather.jpg"}

]

};
function renderPlaylistTable() {
  const tbody = document.querySelector(".song-table tbody");
  tbody.innerHTML = "";

  currentPlaylist.forEach((song, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index+1}</td>
      <td>${song.title}</td>
      <td>${song.artist}</td>
      <td>--</td>
    `;
    row.onclick = () => loadSong(index);
    tbody.appendChild(row);
  });
}


// ================= VARIABLES =================

let currentPlaylist = playlists.topHits;
let currentSong = 0;

let shuffle = false;
let repeat = false;


// ================= OPEN PLAYLIST =================

function openPlaylist(name, image) {
    document.getElementById("chartsPage").style.display = "none";
    document.getElementById("playlistPage").style.display = "block";

    document.getElementById("playlistTitle").innerText = name;
    document.getElementById("playlistImage").src = image;

    // Update the current playlist only
    if(name === "Top Hits") currentPlaylist = playlists.topHits;
    if(name === "Trending") currentPlaylist = playlists.trending;
    if(name === "Top India") currentPlaylist = playlists.topIndia;
    if(name === "Global") currentPlaylist = playlists.global;

renderPlaylistTable(); 
}
// ================= LOAD SONG =================

function loadSong(index){

currentSong = index;

let song = currentPlaylist[index];

audio.src = song.audio;
video.src = song.video;

songTitle.innerText = song.title;
artistName.innerText = song.artist;

mainTitle.innerText = song.title;
mainArtist.innerText = song.artist;

coverImage.src = song.cover;

audio.play();

video.muted = true;
video.currentTime = 0;
video.play();

playBtn.src="pause.png";

}


// ================= PLAY / PAUSE =================

playBtn.onclick = function(){

if(audio.paused){

audio.play();
video.play();
playBtn.src="pause.png";

}else{

audio.pause();
video.pause();
playBtn.src="play-button.png";

}

};


// ================= NEXT =================

nextBtn.onclick=function(){

if(shuffle){

currentSong=Math.floor(Math.random()*currentPlaylist.length);

}else{

currentSong++;

if(currentSong>=currentPlaylist.length){
currentSong=0;
}

}

loadSong(currentSong);

};


// ================= PREVIOUS =================

prevBtn.onclick=function(){

currentSong--;

if(currentSong<0){
currentSong=currentPlaylist.length-1;
}

loadSong(currentSong);

};


// ================= SHUFFLE =================

shuffleBtn.onclick=function(){

shuffle=!shuffle;
shuffleBtn.style.opacity=shuffle?"1":"0.5";

};


// ================= REPEAT =================

repeatBtn.onclick=function(){

repeat=!repeat;
repeatBtn.style.opacity=repeat?"1":"0.5";

};


// ================= PROGRESS =================

audio.addEventListener("timeupdate",function(){

if(!isNaN(audio.duration)){

let percent=(audio.currentTime/audio.duration)*100;
progress.value=percent;

currentTimeEl.innerText=formatTime(audio.currentTime);

}

});


// ================= SEEK =================

progress.addEventListener("input",function(){

if(!isNaN(audio.duration)){

audio.currentTime=(progress.value/100)*audio.duration;
video.currentTime=audio.currentTime;

}

});


// ================= VOLUME =================

volume.addEventListener("input",function(){

audio.volume=volume.value;

});


// ================= TOTAL TIME =================

audio.addEventListener("loadedmetadata",function(){

totalTimeEl.innerText=formatTime(audio.duration);

});


// ================= SONG END =================

audio.addEventListener("ended",function(){

if(repeat){

loadSong(currentSong);

}else{

nextBtn.click();

}

});


// ================= VIDEO SYNC =================

audio.addEventListener("play",function(){

video.currentTime=audio.currentTime;
video.muted=true;

if(video.paused){
video.play();
}

});

audio.addEventListener("pause",function(){

video.pause();

});


// ================= TIME FORMAT =================

function formatTime(seconds){

let minutes=Math.floor(seconds/60);
let sec=Math.floor(seconds%60);

if(sec<10){
sec="0"+sec;
}

return minutes+":"+sec;

}


// ================= INITIAL LOAD =================

loadSong(0);
// ================= CREATE PLAYLIST =================

let userPlaylists = [];

function createPlaylist(){

let playlistName = prompt("Enter playlist name:");

if(!playlistName) return;

let library = document.querySelector(".library");

let container = document.createElement("div");
container.style.display="flex";
container.style.justifyContent="space-between";
container.style.alignItems="center";
container.style.marginTop="10px";

let newPlaylist = document.createElement("p");
newPlaylist.innerText="🎵 "+playlistName;
newPlaylist.style.cursor="pointer";

let deleteBtn=document.createElement("button");
deleteBtn.innerText="✖";
deleteBtn.style.background="transparent";
deleteBtn.style.border="none";
deleteBtn.style.color="white";
deleteBtn.style.cursor="pointer";

container.appendChild(newPlaylist);
container.appendChild(deleteBtn);

library.appendChild(container);

userPlaylists.push({
name:playlistName,
songs:[]
});

newPlaylist.onclick=function(){

document.getElementById("chartsPage").style.display="none";
document.getElementById("playlistPage").style.display="block";

document.getElementById("playlistTitle").innerText=playlistName;

// change playlist image
document.getElementById("playlistImage").src="playlist-default.png";

// change quote
document.querySelector(".playlist-info p").innerText="Your personal playlist";

currentPlaylist=[];
renderPlaylistTable();

};

deleteBtn.onclick=function(){

container.remove();

userPlaylists=userPlaylists.filter(p=>p.name!==playlistName);

};

}