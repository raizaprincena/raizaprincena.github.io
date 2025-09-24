window.onload = function() {
  var video = document.getElementById("urvid");
  var btn = document.getElementById("pause_button");

  btn.onclick = function() {
    if(video.paused){
      video.play();
      btn.innerHTML = "Pause";
    } else {
      video.pause();
      btn.innerHTML = "Play";
    }
  };
};