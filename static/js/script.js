window.addEventListener("DOMContentLoaded", (event) => {

    let songs = document.querySelectorAll(".list-group-item");
    songs.forEach(function(song) {
        song.addEventListener("click", playsong)
    });

    var playButton = document.getElementById("playButton");
    var pauseButton = document.getElementById("pauseButton");

    var progress = document.getElementById('progress_');
    progress.addEventListener('click', moveSong);     


  });

//audios

tracks = [];

song1 = new Audio();
song1.src = "/static/songs/MI - 1 (Prod by Phil john,Mix by NGA Beatz).mp3";
tracks.push(song1);

song2 = new Audio();
song2.src = "/static/songs/Ca Me Tchop Feat Eva Hakapoka (Prod by ANG).mp3";
tracks.push(song2);

song3 = new Audio();
song3.src = "/static/songs/C'est la vie feat Magasco (demo).mp3";
tracks.push(song3);

song4 = new Audio();
song4.src = "/static/songs/defille (demo).mp3";
tracks.push(song4);

song5 = new Audio();
song5.src = "/static/songs/Perce (demo).mp3";
tracks.push(song5);

song6 = new Audio();
song6.src = "/static/songs/OTW (On Te Wait) [Produced by Dj All] Master.mp3";
tracks.push(song6);

song7 = new Audio();
song7.src = "/static/songs/Piment Fort clean.mp3";
tracks.push(song7);

song8 = new Audio();
song8.src = "/static/songs/Bolo (demo).mp3";
tracks.push(song8);



//functions definitions

function playsong () {

    //stop all songs playing
    tracks.forEach(function (track) {
        track.pause();
        track.currentTime = 0;
    });

    //play clicked song
    let title = this.innerHTML;
    for(let i=0; i<9; i++) {
        if (title.includes(String(i))) {

            //get track duration
            duration = tracks[i-1].duration;
            minutes = String(Math.floor(duration / 60)).padStart(2, "0");
            seconds = String(Math.round(duration - (minutes * 60))).padStart(2, "0");

            //reset timer on screen
            document.getElementById("start_time_mins").innerHTML = "00";
            document.getElementById("start_time_secs").innerHTML = "00";
            if (window.lectureInterval) clearInterval(window.lectureInterval);
            
            
            //add track duration to the screen
            document.getElementById("end_time_mins").innerHTML = minutes;
            document.getElementById("end_time_secs").innerHTML = seconds;

            //start playing the track
            tracks[i-1].play();

            //update now playing
            nowPlaying = document.getElementById("now_playing");
            let titres = document.querySelectorAll(".songs_title");
            for (titre of titres){
                if (titre.innerHTML.includes(String(i))) nowPlaying.innerHTML = titre.innerHTML.slice(4);
            }

            //show pause button
            playButton.style.display = "none";
            pauseButton.style.display = "block";
            

            //update duration while playing
            updateDuration (minutes, seconds);
        } 
    }
    
    
}


function updateDuration (minutes, seconds) {
    let mins = parseInt(minutes);
    let secs = parseInt(seconds);
    let duration = (mins * 60) + secs;

    window.lectureInterval = setInterval(function () {

        start_secs = parseInt(document.getElementById("start_time_secs").innerHTML);
        start_mins = parseInt(document.getElementById("start_time_mins").innerHTML);

        if (start_mins != mins) {
            if (start_secs < 59) {
                document.getElementById("start_time_secs").innerHTML = String(start_secs+1).padStart(2, "0");
                
    
            }
    
            else {
                document.getElementById("start_time_secs").innerHTML = String(0).padStart(2, "0");
                document.getElementById("start_time_mins").innerHTML = String(start_mins + 1).padStart(2, "0");
    
            }    

        }
        else {
            if (start_secs != secs) document.getElementById("start_time_secs").innerHTML = String(start_secs+1).padStart(2, "0");
            else if (start_secs == secs) clearInterval(lectureInterval);
        }

        //update lecture progress bar
        percentage = 100 - ((duration - ((start_mins * 60) + start_secs)) * 100 / duration);
        width_ = percentage + "%";
        document.getElementById("lectureProgress").style.width = width_;
        
    }, 1000)
           
}

function playpause() {
    
    //find song to play or to pause
    nowPlaying = document.getElementById("now_playing").innerHTML;
    let titres = document.querySelectorAll(".songs_title");
    for (titre of titres){
        if (titre.innerHTML.includes(nowPlaying)){
            titre_index = titre.innerHTML.split(" - ")[0];
            
        }     
    }
    
    let end_minutes = document.getElementById("end_time_mins").innerHTML;
    let end_secs = document.getElementById("end_time_secs").innerHTML;

    if (playButton.style.display == "block") {
        tracks[titre_index - 1].play();
        updateDuration(end_minutes, end_secs);
        playButton.style.display = "none";
        pauseButton.style.display = "block";
        // document.getElementById("player_left").style.transform = "rotateY(45deg)";
        

    }
    else {
        tracks[titre_index - 1].pause();
        if (window.lectureInterval) clearInterval(window.lectureInterval);
        playButton.style.display = "block";
        pauseButton.style.display = "none";
    }
}


function changeVolume(value) {
    tracks.forEach(function(track) {
        track.volume = value;
    })
}

//change lecture progress bar onclick

function moveSong(e) {

    let end_minutes = document.getElementById("end_time_mins").innerHTML;
    let end_secs = document.getElementById("end_time_secs").innerHTML;

    let duration = parseInt(end_minutes) * 60 + parseInt(end_secs);
      
  // calculate the normalized position clicked
  var clickPosition = (e.pageX  - this.offsetLeft) / this.offsetWidth;
  var clickTime = clickPosition  * duration;
  console.log(clickTime);
  // move the playhead to the correct position
//   myAudio.currentTime = clickTime;
};