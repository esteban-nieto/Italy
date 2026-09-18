/* ========== SCOPRI L'ITALIA — BACKGROUND MUSIC ==========
   YouTube video: https://www.youtube.com/watch?v=uNGZAMx3w-c
   - Autoplays when the page loads (YouTube IFrame API)
   - Press G to pause / resume
   - Shows a brief toast hint on first play
   ========================================================= */

var ytPlayer = null;
var musicPlaying = false;
var toastShown = false;

/* Called automatically by the YouTube IFrame API once loaded */
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: 'uNGZAMx3w-c',
    playerVars: {
      autoplay: 1,       // try autoplay
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: 'uNGZAMx3w-c'  // needed for loop
    },
    events: {
      onReady: function (e) {
        e.target.setVolume(60);
        e.target.playVideo();
      },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.PLAYING) {
          musicPlaying = true;
          if (!toastShown) {
            showMusicToast('🎵 Música italiana sonando — presiona G para detenerla');
            toastShown = true;
          }
        } else if (e.data === YT.PlayerState.PAUSED) {
          musicPlaying = false;
        }
      },
      onError: function () {
        /* Silently ignore errors (e.g. video unavailable in region) */
      }
    }
  });
}

/* Toggle play / pause with G key */
document.addEventListener('keydown', function (e) {
  if (e.key === 'g' || e.key === 'G') {
    if (!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') return;
    if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
      ytPlayer.pauseVideo();
      showMusicToast('⏸ Música pausada — presiona G para reanudar');
    } else {
      ytPlayer.playVideo();
      showMusicToast('▶ Música reanudada — presiona G para detener');
    }
  }
});

/* ---- Toast notification helper ---- */
function showMusicToast(msg) {
  var toast = document.getElementById('music-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.display = 'block';
  toast.classList.remove('music-toast-hide');
  toast.classList.add('music-toast-show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () {
    toast.classList.remove('music-toast-show');
    toast.classList.add('music-toast-hide');
    setTimeout(function () { toast.style.display = 'none'; }, 500);
  }, 3500);
}
