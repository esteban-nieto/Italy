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
    <polygon points="20,2 38,38 2,38" fill="#F5C842" stroke="#C8860A" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M2,38 Q20,30 38,38" fill="#D4933A" stroke="#A0611A" stroke-width="1.2"/>
    <polygon points="20,6 35,36 5,36" fill="#D94040"/>
    <polygon points="20,10 33,35 7,35" fill="#F5D97E"/>
    <circle cx="20" cy="20" r="4" fill="#C0392B"/><circle cx="20" cy="20" r="2.5" fill="#E74C3C"/>
    <circle cx="13" cy="29" r="3.5" fill="#C0392B"/><circle cx="13" cy="29" r="2" fill="#E74C3C"/>
    <circle cx="27" cy="29" r="3.5" fill="#C0392B"/><circle cx="27" cy="29" r="2" fill="#E74C3C"/>
    <ellipse cx="17" cy="15" rx="2.5" ry="1.2" fill="#27AE60" transform="rotate(-30 17 15)"/>
    <ellipse cx="24" cy="25" rx="2.5" ry="1.2" fill="#27AE60" transform="rotate(20 24 25)"/>
  </svg>`;

  Object.assign(cursor.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "40px",
    height: "40px",
    pointerEvents: "none",
    zIndex: "999999",
    transform: "translate(-4px, -4px)",
    transition: "transform 0.05s ease",
    display: "none"
  });

  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.display = "block";
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.addEventListener("mouseleave", function () {
    cursor.style.display = "none";
  });

  document.addEventListener("mouseenter", function () {
    cursor.style.display = "block";
  });
})();

