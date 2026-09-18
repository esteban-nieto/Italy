(function () {
  "use strict";

  /* ---------- MODAL SYSTEM ---------- */
  var overlay = document.getElementById("modalOverlay");
  var lastFocus = null;

  function openModal(id) {
    var d = (window.MODAL_DATA || {})[id];
    if (!d) return;
    lastFocus = document.activeElement;

    document.getElementById("modalAccent").style.background = d.accentColor || "#C46A3F";
    var mImg = document.getElementById("modalImg");
    mImg.src = d.heroImage;
    mImg.alt = d.title + " — " + d.location;

    document.getElementById("modalTitle").textContent = d.title;
    document.getElementById("modalLoc").textContent = d.location;
    document.getElementById("modalP1").textContent = d.paragraphs[0];
    document.getElementById("modalP2").textContent = d.paragraphs[1];
    document.getElementById("modalFact").textContent = " " + d.funFact;

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modalClose").focus();
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  /* Event Listeners for Modals */
  document.addEventListener("click", function(e) {
    var trigger = e.target.closest("[data-modal-id]");
    if (trigger) {
      openModal(trigger.dataset.modalId);
    }
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  /* ---------- CHATBOT LEO WIDGET ---------- */
  var toggle = document.getElementById("chatToggle");
  var win = document.getElementById("chatWindow");
  var msgs = document.getElementById("chatMessages");
  var form = document.getElementById("chatForm");
  var input = document.getElementById("chatText");
  var chips = document.getElementById("quickReplies");
  var AVATAR = "assets/images/Leonardo_sin_pizza.jpeg";

  function addMsg(text, who) {
    var b = document.createElement("div");
    b.className = "bubble " + who;
    if (who === "bot") {
      var av = document.createElement("img");
      av.src = AVATAR;
      av.alt = "Leo";
      av.onerror = function () { av.style.display = "none"; };
      b.appendChild(av);
      var s = document.createElement("span");
      s.textContent = text;
      b.appendChild(s);
    } else {
      b.textContent = text;
    }
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
    return b;
  }

  function answerFor(q) {
    var data = window.CHATBOT_DATA || { faq: [], fallback: "I am painting another Renaissance answer! Ask me about landmarks or Italian pizza!" };
    var low = q.toLowerCase();
    var best = null, bestScore = 0;
    (data.faq || []).forEach(function (entry) {
      var score = 0;
      (entry.keywords || []).forEach(function (k) {
        if (low.indexOf(k.toLowerCase()) !== -1) score += k.length;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    return best ? best.answer : (data.fallback || "Ah, magnificent question! Explore our map or ask about pizza, Rome, or Venice!");
  }

  function botReply(q) {
    var t = document.createElement("div");
    t.className = "bubble bot typing";
    t.textContent = "Leo is painting an answer...";
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(function () {
      t.remove();
      addMsg(answerFor(q), "bot");
    }, 600);
  }

  function openChat() {
    win.hidden = false;
    toggle.style.display = "none";
    if (!msgs.children.length) {
      var data = window.CHATBOT_DATA || {};
      addMsg(data.greeting || "Ciao! I am Leo da Vinci, your guide to Italy!", "bot");
      (data.quickReplies || []).forEach(function (qr) {
        var c = document.createElement("button");
        c.textContent = qr.label;
        c.addEventListener("click", function () {
          addMsg(qr.question, "user");
          botReply(qr.question);
        });
        chips.appendChild(c);
      });
    }
    setTimeout(function () { input.focus(); }, 50);
  }

  function closeChat() {
    win.hidden = true;
    toggle.style.display = "";
    toggle.focus();
  }

  toggle.addEventListener("click", function () {
    if (win.hidden) openChat(); else closeChat();
  });
  document.getElementById("chatClose").addEventListener("click", closeChat);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    addMsg(v, "user");
    input.value = "";
    botReply(v);
  });

  /* Prevent Footer overlap on smaller screens */
  var widget = document.getElementById("chatWidget");
  var footer = document.querySelector(".footer-banner");
  if ("IntersectionObserver" in window && footer) {
    new IntersectionObserver(function (entries) {
      widget.style.bottom = entries[0].isIntersecting ? "90px" : "";
    }).observe(footer);
  }
})();

/* ========== PIZZA CUSTOM CURSOR ========== */
(function () {
  var cursor = document.createElement("div");
  cursor.id = "pizza-cursor";
  cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- 1. Baked Crust Base -->
    <path d="M 3,3 L 38,8 Q 36,36 8,38 Z" fill="#D48C28" stroke="#8C4E00" stroke-width="1.2" stroke-linejoin="round"/>
    <!-- 2. Crust Ridge Detail -->
    <path d="M 38,8 Q 36,36 8,38" fill="none" stroke="#A86209" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 3. Tomato Sauce -->
    <path d="M 3,3 L 34,8 Q 32,32 8,34 Z" fill="#D32F2F"/>
    <!-- 4. Mozzarella Cheese Base -->
    <path d="M 3,3 L 31,9 Q 29,29 9,31 Z" fill="#F7D358"/>
    <!-- 5. Cheese Melt Highlight -->
    <path d="M 3,3 L 26,10 Q 24,24 10,26 Z" fill="#FFF176" opacity="0.6"/>
    <!-- 6. Pepperoni Slices -->
    <circle cx="21" cy="15" r="3.5" fill="#B71C1C"/>
    <circle cx="21" cy="15" r="2.2" fill="#E53935"/>
    <circle cx="15" cy="21" r="3.5" fill="#B71C1C"/>
    <circle cx="15" cy="21" r="2.2" fill="#E53935"/>
    <circle cx="23" cy="23" r="3.2" fill="#B71C1C"/>
    <circle cx="23" cy="23" r="2.0" fill="#E53935"/>
    <!-- 7. Basil Leaves -->
    <path d="M 14,10 C 12,8 16,7 18,10 C 16,12 12,12 14,10 Z" fill="#2E7D32"/>
    <path d="M 19,27 C 17,25 21,24 23,27 C 21,29 17,29 19,27 Z" fill="#2E7D32"/>
  </svg>`;

  Object.assign(cursor.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "40px",
    height: "40px",
    pointerEvents: "none",
    zIndex: "999999",
    display: "none",
    willChange: "transform",
    transform: "translate3d(-100px, -100px, 0)"
  });

  document.body.appendChild(cursor);

  var mouseX = -100, mouseY = -100;
  var scheduled = false;

  function updateCursor() {
    cursor.style.transform = "translate3d(" + (mouseX - 3) + "px, " + (mouseY - 3) + "px, 0)";
    scheduled = false;
  }

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor.style.display !== "block") {
      cursor.style.display = "block";
    }
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateCursor);
    }
  }, { passive: true });

  document.addEventListener("mouseleave", function () {
    cursor.style.display = "none";
  });

  document.addEventListener("mouseenter", function () {
    cursor.style.display = "block";
  });
})();

