/* ========== SCOPRI L'ITALIA — BACKGROUND MUSIC ==========
   YouTube video: https://www.youtube.com/watch?v=uNGZAMx3w-c
   - Autoplays when the page loads (YouTube IFrame API)
   - Press G to pause / resume
   - Shows a brief toast hint on first play
   ========================================================= */

var ytPlayer = null;
var musicPlaying = false;
var toastShown = false;
var musicStarted = false;

function tryStartMusic() {
  if (musicStarted) return;
  if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
    try {
      ytPlayer.playVideo();
    } catch (err) {
      /* Browser autoplay block fallback */
    }
  }
}

function handleFirstInteraction() {
  if (musicStarted) return;
  tryStartMusic();
}

/* Listen for any initial user interaction to unlock audio playback immediately on page open */
['mousemove', 'pointermove', 'touchstart', 'scroll', 'click', 'keydown'].forEach(function (evt) {
  document.addEventListener(evt, handleFirstInteraction, { passive: true, once: true });
});

/* Toggle play / pause music */
function toggleMusic() {
  if (!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') return;
  var state = ytPlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    ytPlayer.pauseVideo();
    showMusicToast('⏸ Música pausada — 2 toques o tecla G para reanudar');
  } else {
    ytPlayer.playVideo();
    musicStarted = true;
    showMusicToast('▶ Música reanudada — 2 toques o tecla G para detener');
  }
}

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
        tryStartMusic();
      },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.PLAYING) {
          musicPlaying = true;
          musicStarted = true;
          if (!toastShown) {
            var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            var hint = isTouch
              ? '🎵 Música italiana sonando — 2 toques en pantalla para detenerla'
              : '🎵 Música italiana sonando — presiona G para detenerla';
            showMusicToast(hint);
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
    toggleMusic();
  }
});

/* Double-tap gesture handler for mobile phones */
var lastTapTime = 0;
var lastTapX = 0;
var lastTapY = 0;

document.addEventListener('touchend', function (e) {
  var target = e.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
    return;
  }

  var currentTime = new Date().getTime();
  var tapLength = currentTime - lastTapTime;

  if (e.changedTouches && e.changedTouches.length > 0) {
    var touch = e.changedTouches[0];
    var deltaX = Math.abs(touch.clientX - lastTapX);
    var deltaY = Math.abs(touch.clientY - lastTapY);

    if (tapLength < 350 && tapLength > 0 && deltaX < 40 && deltaY < 40) {
      toggleMusic();
      lastTapTime = 0;
      return;
    }

    lastTapTime = currentTime;
    lastTapX = touch.clientX;
    lastTapY = touch.clientY;
  }
}, { passive: true });

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
