(function() {
  "use strict";

  function initExploreMap() {
    var mapPins = document.querySelectorAll('.map-pin, .map-pin-badge');
    
    mapPins.forEach(function(pin) {
      pin.addEventListener('click', function() {
        var regionKey = this.dataset.region;
        if (regionKey && typeof window.openModal === 'function') {
          window.openModal(regionKey);
        } else if (regionKey && document.querySelector('[data-modal-id="' + regionKey + '"]')) {
          document.querySelector('[data-modal-id="' + regionKey + '"]').click();
        }
      });
      
      pin.setAttribute('tabindex', '0');
      pin.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExploreMap);
  } else {
    initExploreMap();
  }
})();
